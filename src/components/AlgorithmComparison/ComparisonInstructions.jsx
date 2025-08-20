const ComparisonInstructions = ({ showNames, currentPair }) => {
  if (showNames || currentPair.length === 0) return null;

  return (
    <div className="text-center font-radio text-sm text-stone-600 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <p className="mb-2 font-medium">How to compare:</p>
      <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
        <li>Review each algorithm's susceptibility map below</li>
        <li>Compare the quality and accuracy of both algorithms</li>
        <li>Click "SELECT THIS" next to the algorithm you prefer</li>
        <li>Algorithm names will be revealed after selection</li>
      </ol>
    </div>
  );
};

export default ComparisonInstructions;
