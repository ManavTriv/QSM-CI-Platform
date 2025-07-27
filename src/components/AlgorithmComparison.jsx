import React, { useState, useEffect } from "react";
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
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [eloError, setEloError] = useState(null);

  const generateNewPair = () => {
    if (!data || data.length < 2) return;

    let availableIndices = data
      .map((_, index) => index)
      .filter((index) => !usedIndices.includes(index));

    if (availableIndices.length < 2) {
      setUsedIndices([]);
      availableIndices = data.map((_, index) => index);
    }

    const firstIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    let secondIndex;
    do {
      secondIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } while (secondIndex === firstIndex);

    setCurrentPair([data[firstIndex], data[secondIndex]]);
    setUsedIndices((prev) => [...prev, firstIndex, secondIndex]);
    setSelectedAlgorithm(null);
    setShowNames(false);
  };

  useEffect(() => {
    if (data && data.length >= 2) {
      generateNewPair();
    }
  }, [data]);

  const handleSelect = async (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowNames(true);
    const error = await updateElo(algorithm.objectId, 10);
    if (error) {
      setEloError(error);
    }
  };

  const handleNext = () => {
    generateNewPair();
  };

  if (error || eloError)
    return <ErrorMessage message={(error || eloError).message} />;
  if (loading) return <LoadingMessage />;

  return (
    <div className="mt-8 flex flex-col items-center w-full max-w-screen-xl mx-auto px-4 bg-[#fffefb] pb-8 font-radio">
      {showNames && (
        <button
          onClick={handleNext}
          className="mb-8 px-6 py-2 rounded-full font-radio text-md font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500"
        >
          NEXT COMPARISON
        </button>
      )}
      <div className="flex flex-col space-y-8 w-full">
        {currentPair.map((algorithm, index) => {
          const isSelected = selectedAlgorithm?.id === algorithm.id;
          return (
            <div
              key={algorithm.id}
              className={`w-full rounded-xl overflow-hidden transition-all ring-1 py-2 ${
                isSelected
                  ? "ring-2 ring-indigo-500 bg-indigo-50"
                  : "ring-gray-200 bg-white"
              }`}
            >
              <div className="p-4">
                <NiivueViewer image={algorithm.url} />
              </div>
              <div className="flex items-center justify-center gap-x-4 pb-2 px-2 bg-transparent">
                <h3 className="font-radio text-lg font-medium text-stone-850">
                  {showNames ? algorithm.name : `Algorithm ${index + 1}`}
                </h3>

                {!showNames && (
                  <button
                    onClick={() => handleSelect(algorithm)}
                    className="px-4 py-1.5 cursor-pointer rounded-full font-radio text-sm font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500"
                  >
                    SELECT
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
