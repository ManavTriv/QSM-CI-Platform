const ComparisonControls = ({ showNames, onNext }) => {
  if (!showNames) return null;

  return (
    <button
      onClick={onNext}
      className="mb-8 px-6 py-3 rounded-full font-radio text-sm font-semibold transition-all bg-indigo-400 text-white hover:bg-indigo-500 shadow-md cursor-pointer"
      title="Generate a new pair of algorithms to compare"
    >
      NEXT COMPARISON
    </button>
  );
};

export default ComparisonControls;
