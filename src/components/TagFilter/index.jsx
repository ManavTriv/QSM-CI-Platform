import { Filter, X } from "lucide-react";
import useTagFilter from "../../hooks/useTagFilter";
import TagFilterDropdown from "./TagFilterDropdown";

const TagFilter = ({
  data,
  selectedTags,
  onTagsChange,
  placeholder = "Filter by tags",
  className = "",
  dropdownPosition = "left",
}) => {
  const {
    isOpen,
    tagSearchTerm,
    setTagSearchTerm,
    availableTags,
    filteredTags,
    handleTagToggle,
    clearAllTags,
    toggleDropdown,
    closeDropdown,
    clearTagSearch,
  } = useTagFilter(data, selectedTags, onTagsChange);

  return (
    <div className={`relative ${className}`}>
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
            ? placeholder
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

      <TagFilterDropdown
        isOpen={isOpen}
        dropdownPosition={dropdownPosition}
        availableTags={availableTags}
        filteredTags={filteredTags}
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
