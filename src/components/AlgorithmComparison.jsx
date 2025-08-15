import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import useProcessedData from "../hooks/useProcessedData";
import useEloUpdater from "../hooks/useEloUpdater";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

// Lazy load the heavy 3D viewer component (lowers npm bundle size)
const NiivueViewer = lazy(() => import("./NiivueViewer"));

const AlgorithmComparison = () => {
  const { data, error, loading } = useProcessedData();
  const updateElo = useEloUpdater();

  const [currentPair, setCurrentPair] = useState([]);
  const [usedIndices, setUsedIndices] = useState([]);
  const [previousPair, setPreviousPair] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [eloError, setEloError] = useState(null);
  const [currentViewerIndex, setCurrentViewerIndex] = useState(0);
  const initializedRef = useRef(false);

  const generateNewPair = useCallback(() => {
    if (!data || data.length < 2) return;

    let availableIndices = data
      .map((_, index) => index)
      .filter((index) => !usedIndices.includes(index));

    if (availableIndices.length < 2) {
      setUsedIndices([]);
      availableIndices = data.map((_, index) => index);
    }

    let firstIndex, secondIndex;
    let pairIsNew = false;
    let maxTries = 20;

    while (!pairIsNew && maxTries-- > 0) {
      firstIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      do {
        secondIndex =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
      } while (secondIndex === firstIndex);

      const pair = [firstIndex, secondIndex].sort();
      const prev = [...previousPair].sort();
      pairIsNew = pair[0] !== prev[0] || pair[1] !== prev[1];
    }

    setCurrentPair([data[firstIndex], data[secondIndex]]);
    setPreviousPair([firstIndex, secondIndex]);
    setUsedIndices((prev) => [...prev, firstIndex, secondIndex]);
    setSelectedAlgorithm(null);
    setShowNames(false);
    setCurrentViewerIndex(0); // Reset to first algorithm
  }, [data, usedIndices, previousPair]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (data && data.length >= 2) {
      generateNewPair();
      initializedRef.current = true;
    }
  }, [data, generateNewPair]);

  const handleSelect = async (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowNames(true);

    const otherAlgorithm = currentPair.find(
      (a) => a.objectId !== algorithm.objectId
    );

    const error = await updateElo(algorithm.objectId, otherAlgorithm.objectId);
    if (error) {
      setEloError(error);
    }
  };

  const handleNext = () => {
    generateNewPair();
  };

  if (error || eloError) {
    return (
      <ErrorMessage
        message={
          error?.message || eloError?.message || "An unknown error occurred."
        }
      />
    );
  }

  if (loading) return <LoadingMessage />;

  return (
    <div className="mt-8 flex flex-col items-center w-full max-w-screen-xl mx-auto px-4 bg-[#fffefb] pb-8 font-radio">
      {showNames && (
        <button
          onClick={handleNext}
          className="mb-8 px-6 py-3 rounded-full font-radio text-sm font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500 shadow-md"
          title="Generate a new pair of algorithms to compare"
        >
          NEXT COMPARISON
        </button>
      )}
      
      <div className="flex flex-col space-y-8 w-full">

        <div className="flex justify-center gap-6">
          {currentPair.map((algorithm, index) => {
            const isSelected = selectedAlgorithm?.objectId === algorithm.objectId;
            const isCurrent = currentViewerIndex === index;
            const isOtherSelected = selectedAlgorithm && selectedAlgorithm.objectId !== algorithm.objectId;
            
            return (
              <div 
                key={algorithm.objectId} 
                className={`relative flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? "border-green-400 bg-green-50 shadow-lg" 
                    : isCurrent 
                    ? "border-indigo-400 bg-indigo-50 shadow-md" 
                    : "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm"
                }`}
              >

                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Algorithm label */}
                <div className="text-center">
                  <h3 className="font-radio text-base font-semibold text-stone-800 mb-1">
                    {showNames ? algorithm.name : `Algorithm ${index + 1}`}
                  </h3>
                  {isCurrent && (
                    <span className="inline-block px-2 py-1 text-xs font-radio font-medium bg-indigo-100 text-indigo-700 rounded-full">
                      Currently Viewing
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setCurrentViewerIndex(index)}
                  disabled={isCurrent}
                  className={`px-4 py-2 rounded-lg font-radio text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm cursor-pointer"
                  }`}
                  title={isCurrent ? "Currently viewing" : `View ${showNames ? algorithm.name : `Algorithm ${index + 1}`}`}
                >
                  {isCurrent ? "VIEWING" : "VIEW"}
                </button>

                {!showNames && (
                  <button
                    onClick={() => handleSelect(algorithm)}
                    disabled={selectedAlgorithm !== null}
                    className={`px-4 py-2 rounded-lg font-radio text-sm font-semibold transition-all shadow-sm ${
                      isSelected
                        ? "bg-green-500 text-white cursor-default"
                        : isOtherSelected
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-indigo-600 border-2 border-indigo-400 hover:bg-indigo-400 hover:text-white cursor-pointer"
                    }`}
                    title={
                      isSelected 
                        ? "This algorithm is selected" 
                        : isOtherSelected 
                        ? "You have already made a selection" 
                        : "Select this algorithm as your preference"
                    }
                  >
                    {isSelected ? "✓ SELECTED" : isOtherSelected ? "NOT SELECTED" : "SELECT THIS"}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {currentPair.length > 0 && (
          <div className="text-center space-y-2">
            <p className="font-radio text-lg font-medium text-stone-800">
              {showNames ? currentPair[currentViewerIndex]?.name : `Algorithm ${currentViewerIndex + 1}`}
            </p>
            {!showNames && (
              <p className="font-radio text-sm text-stone-600">
                Compare the susceptibility maps below and select the one you prefer
              </p>
            )}
          </div>
        )}

        {currentPair.length > 0 && (
          <div className="w-full rounded-xl overflow-hidden bg-white border border-indigo-100 shadow-md">
            <div className="p-6">
              <Suspense fallback={<LoadingMessage />}>
                <NiivueViewer image={currentPair[currentViewerIndex]?.url} />
              </Suspense>
            </div>
          </div>
        )}

        {!showNames && currentPair.length > 0 && (
          <div className="text-center font-radio text-sm text-stone-600 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="mb-2 font-medium">How to compare:</p>
            <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
              <li>Use the "VIEW" buttons above to switch between algorithms</li>
              <li>Compare the susceptibility maps carefully</li>
              <li>Click "SELECT THIS" on the algorithm you prefer</li>
              <li>Algorithm names will be revealed after selection</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
