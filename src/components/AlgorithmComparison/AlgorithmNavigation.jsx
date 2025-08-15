import AlgorithmCard from "./AlgorithmCard";

const AlgorithmNavigation = ({
  currentPair,
  selectedAlgorithm,
  currentViewerIndex,
  showNames,
  onViewChange,
  onSelect,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
      {currentPair.map((algorithm, index) => {
        const isSelected = selectedAlgorithm?.objectId === algorithm.objectId;
        const isCurrent = currentViewerIndex === index;
        const disabled = selectedAlgorithm !== null;

        return (
          <AlgorithmCard
            key={algorithm.objectId}
            algorithm={algorithm}
            index={index}
            isSelected={isSelected}
            isCurrent={isCurrent}
            showNames={showNames}
            onView={onViewChange}
            onSelect={onSelect}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default AlgorithmNavigation;
