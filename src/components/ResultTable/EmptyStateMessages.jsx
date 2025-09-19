const EmptyStateMessages = ({ searchTerm, selectedTags, onClearSearch, onClearTags }) => {
  if (!searchTerm && selectedTags.length === 0) return null;

  const getMessage = () => {
    if (searchTerm && selectedTags.length > 0) {
      return `No algorithms found matching "${searchTerm}" with selected tags`;
    }
    if (searchTerm) {
      return `No algorithms found matching "${searchTerm}"`;
    }
    return "No algorithms found with selected tags";
  };

  return (
    <div className="text-center py-8 px-4">
      <p className="text-stone-600 font-radio">{getMessage()}</p>
      <div className="mt-2 space-x-2">
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
          >
            Clear search
          </button>
        )}
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
          >
            Clear tags
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyStateMessages;
