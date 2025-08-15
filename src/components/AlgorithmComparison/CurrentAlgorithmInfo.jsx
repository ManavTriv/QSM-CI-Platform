const CurrentAlgorithmInfo = ({
  currentPair,
  currentViewerIndex,
  showNames,
}) => {
  if (currentPair.length === 0) return null;

  return (
    <div className="text-center space-y-2">
      <p className="font-radio text-lg font-medium text-stone-800">
        {showNames
          ? currentPair[currentViewerIndex]?.name
          : `Algorithm ${currentViewerIndex + 1}`}
      </p>
      {!showNames && (
        <p className="font-radio text-sm text-stone-600">
          Compare the susceptibility maps below and select the one you prefer
        </p>
      )}
    </div>
  );
};

export default CurrentAlgorithmInfo;
