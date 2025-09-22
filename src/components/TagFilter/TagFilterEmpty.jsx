const TagFilterEmpty = ({ searchTerm, onClearSearch }) => {
  if (searchTerm) {
    return (
      <div className="p-4 text-center text-sm text-stone-600 font-radio">
        <p>No tags found matching "{searchTerm}"</p>
        <button
          onClick={onClearSearch}
          className="text-indigo-400 hover:text-indigo-600 font-radio text-xs cursor-pointer mt-1"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 text-center text-sm text-stone-600 font-radio">
      <p>No tags available</p>
    </div>
  );
};

export default TagFilterEmpty;
