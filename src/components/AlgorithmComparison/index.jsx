import { useState, lazy, Suspense } from "react";
import useEloUpdater from "../../hooks/useEloUpdater";
import useAlgorithmComparison from "../../hooks/useAlgorithmComparison";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import ComparisonInstructions from "./ComparisonInstructions";

const NiivueViewer = lazy(() => import("../NiivueViewer"));

const AlgorithmComparison = ({ data }) => {
  const updateElo = useEloUpdater();
  const [eloError, setEloError] = useState(null);

  const {
    currentPair,
    selectedAlgorithm,
    showNames,
    handleNext,
    handleSelect: handleAlgorithmSelect,
  } = useAlgorithmComparison(data);

  const handleSelect = async (algorithm) => {
    handleAlgorithmSelect(algorithm);

    const otherAlgorithm = currentPair.find(
      (a) => a.objectId !== algorithm.objectId
    );

    const error = await updateElo(algorithm.objectId, otherAlgorithm.objectId);
    if (error) {
      setEloError(error);
    }
  };

  if (eloError) {
    return (
      <ErrorMessage
        message={eloError?.message || "An unknown error occurred."}
      />
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-[#fffefb] pb-8 font-radio">
      <div className="flex flex-col space-y-8 w-full">
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={selectedAlgorithm === null}
            className={`px-6 py-3 font-radio font-medium rounded-lg transition-all shadow-sm ${
              selectedAlgorithm
                ? "bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next Comparison
          </button>
        </div>

        {currentPair.length > 0 && (
          <div className="w-full space-y-6">
            {currentPair.map((algorithm, index) => (
              <div
                key={algorithm.objectId}
                className={`w-full rounded-xl overflow-hidden bg-white border-2 shadow-md transition-all duration-300 ${
                  selectedAlgorithm?.objectId === algorithm.objectId
                    ? "border-green-400 bg-green-50 shadow-lg"
                    : "border-indigo-100 hover:border-indigo-200"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-radio text-xl font-semibold text-stone-800">
                      {showNames ? algorithm.name : `Algorithm ${index + 1}`}
                    </h3>

                    {!showNames && (
                      <button
                        onClick={() => handleSelect(algorithm)}
                        disabled={selectedAlgorithm !== null}
                        className={`px-4 py-2 rounded-lg font-radio text-sm font-semibold transition-all shadow-sm ${
                          selectedAlgorithm?.objectId === algorithm.objectId
                            ? "bg-green-500 text-white cursor-default"
                            : selectedAlgorithm !== null
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
                        }`}
                        title={
                          selectedAlgorithm?.objectId === algorithm.objectId
                            ? "This algorithm is selected"
                            : selectedAlgorithm !== null
                            ? "You have already made a selection"
                            : "Select this algorithm as your preference"
                        }
                      >
                        {selectedAlgorithm?.objectId === algorithm.objectId
                          ? "✓ SELECTED"
                          : selectedAlgorithm !== null
                          ? "NOT SELECTED"
                          : "SELECT THIS"}
                      </button>
                    )}

                    {showNames &&
                      selectedAlgorithm?.objectId === algorithm.objectId && (
                        <span className="inline-block px-3 py-1 text-sm font-radio font-medium bg-green-100 text-green-700 rounded-full">
                          ✓ SELECTED
                        </span>
                      )}
                  </div>

                  <Suspense
                    fallback={
                      <LoadingSpinner
                        message="Loading 3D viewer"
                        description="Initializing medical image viewer..."
                      />
                    }
                  >
                    <NiivueViewer image={algorithm.url} />
                  </Suspense>
                </div>
              </div>
            ))}
          </div>
        )}

        <ComparisonInstructions
          showNames={showNames}
          currentPair={currentPair}
        />
      </div>
    </div>
  );
};

export default AlgorithmComparison;
