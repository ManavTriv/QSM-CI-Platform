import TagSearchInput from "./TagSearchInput";
import TagGroupSection from "./TagGroupSection";
import TagFilterEmpty from "./TagFilterEmpty";

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
            <TagSearchInput
              searchTerm={tagSearchTerm}
              onSearchChange={setTagSearchTerm}
              onClearSearch={clearTagSearch}
            />
          )}
        </div>

        <div className="max-h-48 overflow-y-auto">
          {filteredTags.length > 0 ? (
            <div className="p-2">
              {/* Grouped Tags */}
              {processedTags &&
                Object.entries(processedTags.grouped).map(
                  ([groupId, groupValues]) => {
                    const filteredGroupTags = groupValues
                      .map((value) => `${groupId}::${value}`)
                      .filter((fullTag) => filteredTags.includes(fullTag));

                    return (
                      <TagGroupSection
                        key={groupId}
                        groupId={groupId}
                        groupTitle={groupId}
                        tags={filteredGroupTags}
                        selectedTags={selectedTags}
                        onTagToggle={handleTagToggle}
                      />
                    );
                  }
                )}

              {/* Ungrouped Tags */}
              {processedTags && (
                <TagGroupSection
                  groupId={null}
                  groupTitle="Other Tags"
                  tags={processedTags.ungrouped.filter((tag) =>
                    filteredTags.includes(tag)
                  )}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                />
              )}
            </div>
          ) : (
            <TagFilterEmpty
              searchTerm={tagSearchTerm}
              onClearSearch={clearTagSearch}
            />
          )}
        </div>
      </div>

      <div className="fixed inset-0 z-10" onClick={onClose} />
    </>
  );
};

export default TagFilterDropdown;
