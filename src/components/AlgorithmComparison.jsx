import React, { useState, useEffect, useRef } from "react";
import useProcessedData from "../hooks/useProcessedData";
import useEloUpdater from "../hooks/useEloUpdater";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import NiivueViewer from "./NiivueViewer";

const AlgorithmComparison = () => {
  const { data, error, loading } = useProcessedData();
  const updateElo = useEloUpdater();

  const [currentPair, setCurrentPair] = useState([]);
  const [usedIndices, setUsedIndices] = useState([]);
  const [previousPair, setPreviousPair] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [eloError, setEloError] = useState(null);
  const initializedRef = useRef(false);

  const generateNewPair = () => {
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
  };

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
          className="mb-8 px-6 py-2 rounded-full font-radio text-md font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500"
          title="Generate a new pair of algorithms to compare"
        >
          NEXT COMPARISON
        </button>
      )}
      <div className="flex flex-col space-y-10 w-full">
        {currentPair.map((algorithm, index) => {
          const isSelected = selectedAlgorithm?.objectId === algorithm.objectId;
          return (
            <div
              key={algorithm.objectId}
              className={`w-full rounded-xl overflow-hidden transition-all ring-1 ${
                isSelected
                  ? "ring-2 ring-indigo-500 bg-indigo-50"
                  : "ring-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between px-6 pt-4">
                <h3
                  className="font-radio text-lg font-medium text-stone-850"
                  title={showNames ? algorithm.name : `Algorithm ${index + 1}`}
                >
                  {showNames ? algorithm.name : `Algorithm ${index + 1}`}
                </h3>
                {!showNames && (
                  <button
                    onClick={() => handleSelect(algorithm)}
                    disabled={selectedAlgorithm !== null}
                    className="px-4 py-1.5 cursor-pointer rounded-full font-radio text-sm font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Select this algorithm as your preference"
                  >
                    SELECT
                  </button>
                )}
              </div>
              <div className="p-6">
                <NiivueViewer image={algorithm.url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
