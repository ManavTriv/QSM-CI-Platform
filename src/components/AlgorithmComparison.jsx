import React, { useState, useEffect } from "react";
import useProcessedData from "../hooks/useProcessedData";
import useEloUpdater from "../hooks/useEloUpdater";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

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
    <div className="mt-8 flex flex-col items-center">
      <div className="flex justify-center space-x-4 mb-8">
        {currentPair.map((algorithm, index) => (
          <div
            key={algorithm.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all whitespace-nowrap text-sm
                  ${
                    selectedAlgorithm?.id === algorithm.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }
                  ${showNames ? "" : "hover:border-indigo-300"}`}
            onClick={() => !showNames && handleSelect(algorithm)}
          >
            <div className="w-64 h-64 bg-gray-100 flex items-center justify-center mb-2">
              <span className="font-radio text-stone-850">Algorithm Image</span>
            </div>
            <div className="text-center">
              {showNames ? (
                <span className="font-radio text-stone-850 font-semibold">
                  {algorithm.name}
                </span>
              ) : (
                <span className="font-radio text-stone-850">
                  Algorithm {index + 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNames && (
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-full font-radio text-sm font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500"
        >
          NEXT COMPARISON
        </button>
      )}
    </div>
  );
};

export default AlgorithmComparison;
