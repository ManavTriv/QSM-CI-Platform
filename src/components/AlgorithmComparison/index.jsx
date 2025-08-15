import { useState, lazy, Suspense } from "react";
import useEloUpdater from "../../hooks/useEloUpdater";
import useAlgorithmComparison from "../../hooks/useAlgorithmComparison";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import ComparisonControls from "./ComparisonControls";
import AlgorithmNavigation from "./AlgorithmNavigation";
import CurrentAlgorithmInfo from "./CurrentAlgorithmInfo";
import ComparisonInstructions from "./ComparisonInstructions";

// Lazy load the heavy 3D viewer component (lowers npm bundle size)
const NiivueViewer = lazy(() => import("../NiivueViewer"));

const AlgorithmComparison = ({ data }) => {
  const updateElo = useEloUpdater();
  const [eloError, setEloError] = useState(null);

  const {
    currentPair,
    selectedAlgorithm,
    showNames,
    currentViewerIndex,
    handleNext,
    handleSelect: handleAlgorithmSelect,
    handleViewChange,
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
    <div className="mt-8 flex flex-col items-center w-full max-w-screen-xl mx-auto px-4 bg-[#fffefb] pb-8 font-radio">
      <ComparisonControls showNames={showNames} onNext={handleNext} />

      <div className="flex flex-col space-y-8 w-full">
        <AlgorithmNavigation
          currentPair={currentPair}
          selectedAlgorithm={selectedAlgorithm}
          currentViewerIndex={currentViewerIndex}
          showNames={showNames}
          onViewChange={handleViewChange}
          onSelect={handleSelect}
        />

        <CurrentAlgorithmInfo
          currentPair={currentPair}
          currentViewerIndex={currentViewerIndex}
          showNames={showNames}
        />

        {currentPair.length > 0 && (
          <div className="w-full rounded-xl overflow-hidden bg-white border border-indigo-100 shadow-md">
            <div className="p-6">
              <Suspense
                fallback={
                  <LoadingSpinner
                    message="Loading 3D viewer"
                    description="Initializing medical image viewer..."
                  />
                }
              >
                <NiivueViewer image={currentPair[currentViewerIndex]?.url} />
              </Suspense>
            </div>
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
