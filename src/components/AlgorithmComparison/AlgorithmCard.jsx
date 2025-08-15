const AlgorithmCard = ({
  algorithm,
  index,
  isSelected,
  isCurrent,
  showNames,
  onView,
  onSelect,
  disabled,
}) => {
  const isOtherSelected = disabled && !isSelected;

  return (
    <div
      className={`relative flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-300 ${
        isSelected
          ? "border-green-400 bg-green-50 shadow-lg"
          : isCurrent
          ? "border-indigo-400 bg-indigo-50 shadow-md"
          : "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm"
      }`}
    >
      {/* Selection indicator badge */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
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

      {/* View button */}
      <button
        onClick={() => onView(index)}
        disabled={isCurrent}
        className={`px-4 py-2 rounded-lg font-radio text-sm font-medium transition-all ${
          isCurrent
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm cursor-pointer"
        }`}
        title={
          isCurrent
            ? "Currently viewing"
            : `View ${showNames ? algorithm.name : `Algorithm ${index + 1}`}`
        }
      >
        {isCurrent ? "VIEWING" : "VIEW"}
      </button>

      {/* Selection button */}
      {!showNames && (
        <button
          onClick={() => onSelect(algorithm)}
          disabled={disabled}
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
          {isSelected
            ? "✓ SELECTED"
            : isOtherSelected
            ? "NOT SELECTED"
            : "SELECT THIS"}
        </button>
      )}
    </div>
  );
};

export default AlgorithmCard;
