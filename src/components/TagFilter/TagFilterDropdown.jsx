import { Tag, X, Search, Layers } from "lucide-react";

const TagFilterDropdown = ({
  isOpen,
  dropdownPosition,
  availableTags,
  filteredTags,
  processedTags,
  selectedTags,
  tagSearchTerm,
  setTagSearchTerm,
  handleTagToggle,
  clearAllTags,
  clearTagSearch,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`absolute z-[100] mt-2 ${
          dropdownPosition === "right"
            ? "right-0"
            : dropdownPosition === "responsive"
            ? "left-0 sm:right-0 sm:left-auto"
            : "left-0"
        } bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] max-w-[400px] max-h-[400px] overflow-hidden`}
      >
        <div className="p-3 border-b border-gray-200 space-y-3">
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

          {availableTags.length > 5 && (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search tags..."
                value={tagSearchTerm}
                onChange={(e) => setTagSearchTerm(e.target.value)}
                className="w-full pl-7 pr-7 py-1.5 text-xs font-radio border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent"
              />
              {tagSearchTerm && (
                <button
                  onClick={clearTagSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="max-h-48 overflow-y-auto">
          {filteredTags.length > 0 ? (
            <div className="p-2">
              {/* Grouped Tags */}
              {processedTags && Object.entries(processedTags.grouped).map(([groupId, groupValues]) => {
                const filteredGroupValues = groupValues.filter(value => {
                  const fullTag = `${groupId}::${value}`;
                  return filteredTags.includes(fullTag);
                });

                if (filteredGroupValues.length === 0) return null;

                return (
                  <div key={groupId} className="mb-3">
                    <div className="flex items-center gap-2 px-2 py-1 mb-1">
                      <Tag className="w-3 h-3 text-indigo-500" />
                      <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                        {groupId}
                      </span>
                    </div>
                    {filteredGroupValues.map((value) => {
                      const fullTag = `${groupId}::${value}`;
                      return (
                        <button
                          key={fullTag}
                          onClick={() => handleTagToggle(fullTag)}
                          className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm font-radio rounded transition-colors cursor-pointer ${
                            selectedTags.includes(fullTag)
                              ? "bg-indigo-200 text-indigo-800 border border-indigo-300"
                              : "text-stone-700 hover:bg-gray-50"
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          <span className="truncate">{value}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {/* Ungrouped Tags */}
              {processedTags && processedTags.ungrouped.filter(tag => filteredTags.includes(tag)).length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 px-2 py-1 mb-1">
                    <Tag className="w-3 h-3 text-indigo-500" />
                    <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                      Other Tags
                    </span>
                  </div>
                  {processedTags.ungrouped
                    .filter(tag => filteredTags.includes(tag))
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm font-radio rounded transition-colors cursor-pointer ${
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
              )}
            </div>
          ) : tagSearchTerm ? (
            <div className="p-4 text-center text-sm text-stone-600 font-radio">
              <p>No tags found matching "{tagSearchTerm}"</p>
              <button
                onClick={clearTagSearch}
                className="text-indigo-400 hover:text-indigo-600 font-radio text-xs cursor-pointer mt-1"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-stone-600 font-radio">
              <p>No tags available</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-0 z-10" onClick={onClose} />
    </>
  );
};

export default TagFilterDropdown;
