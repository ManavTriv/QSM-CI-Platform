import { Filter, X } from "lucide-react";
import useTagFilter from "../../hooks/useTagFilter";
import TagFilterDropdown from "./TagFilterDropdown";

const TagFilter = ({ data, selectedTags, onTagsChange, placeholder = "Filter by tags", className = "", dropdownPosition = "left" }) => {
  const {
    isOpen,
    tagSearchTerm,
    setTagSearchTerm,
    availableTags,
    filteredTags,
    processedTags,
    handleTagToggle,
    clearAllTags,
    toggleDropdown,
    closeDropdown,
    clearTagSearch,
  } = useTagFilter(data, selectedTags, onTagsChange);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <button
          onClick={toggleDropdown}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-radio border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${
            selectedTags.length > 0
              ? "bg-indigo-100 border-indigo-300 text-indigo-700"
              : "bg-white border-gray-200 text-stone-700 hover:bg-gray-50"
          } ${selectedTags.length > 0 ? "rounded-r-none border-r-0" : ""}`}
        >
          <Filter className="w-4 h-4" />
          <span>
            {selectedTags.length === 0
              ? placeholder
              : `${selectedTags.length} tag${
                  selectedTags.length === 1 ? "" : "s"
                } selected`}
          </span>
        </button>
        {selectedTags.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearAllTags();
            }}
            className="px-2 py-2 text-sm font-radio border border-l-0 rounded-r-lg bg-indigo-100 border-indigo-300 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <TagFilterDropdown
        isOpen={isOpen}
        dropdownPosition={dropdownPosition}
        availableTags={availableTags}
        filteredTags={filteredTags}
        processedTags={processedTags}
        selectedTags={selectedTags}
        tagSearchTerm={tagSearchTerm}
        setTagSearchTerm={setTagSearchTerm}
        handleTagToggle={handleTagToggle}
        clearAllTags={clearAllTags}
        clearTagSearch={clearTagSearch}
        onClose={closeDropdown}
      />
    </div>
  );
};

export default TagFilter;
