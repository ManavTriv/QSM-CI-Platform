import { useState, useMemo } from "react";
import { Tag, X, Filter } from "lucide-react";

const TagFilter = ({ data, selectedTags, onTagsChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableTags = useMemo(() => {
    const tagSet = new Set();
    data.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [data]);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-radio border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${
          selectedTags.length > 0
            ? "bg-indigo-100 border-indigo-300 text-indigo-700"
            : "bg-white border-gray-200 text-stone-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>
          {selectedTags.length === 0
            ? "Filter by tags"
            : `${selectedTags.length} tag${
                selectedTags.length === 1 ? "" : "s"
              } selected`}
        </span>
        {selectedTags.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearAllTags();
            }}
            className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 left-0 sm:right-0 sm:left-auto bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] max-w-[300px]">
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-stone-800 font-radio">
                Filter by Tags
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearAllTags}
                  className="text-xs text-indigo-400 hover:text-indigo-600 font-radio cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {availableTags.length > 0 ? (
              <div className="p-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm font-radio rounded transition-colors cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-stone-700 hover:bg-gray-50"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    <span className="truncate">{tag}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-stone-600 font-radio">
                <p>No tags available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default TagFilter;
