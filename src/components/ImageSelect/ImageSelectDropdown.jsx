import { Search, X } from "lucide-react";
import TagFilter from "../TagFilter";

const ImageSelectDropdown = ({
  isOpen,
  dropdownWidth,
  data,
  filteredData,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  selectedUrl,
  handleSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute z-20 mt-2 min-w-[32rem] max-w-[95vw]"
      style={{ width: Math.max(dropdownWidth, 600) }}
    >
      <div className="bg-white border border-gray-200 rounded-md shadow-xl">
        <div className="p-3 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 text-sm font-radio border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex-shrink-0 relative z-50">
              <TagFilter
                data={data}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                placeholder="Filter by tags"
                dropdownPosition="right"
              />
            </div>
          </div>
        </div>

        <div className="max-h-64 overflow-auto">
          {filteredData.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <li key={item.url}>
                  <button
                    onClick={() => handleSelect(item.url)}
                    className={`w-full text-left px-4 py-2 text-sm font-radio transition-colors cursor-pointer ${
                      selectedUrl === item.url
                        ? "bg-indigo-400 text-white"
                        : "text-stone-800 hover:bg-indigo-100 hover:text-indigo-500"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-stone-600 font-radio">
              <p className="mb-2">
                {searchTerm && selectedTags.length > 0
                  ? `No algorithms found matching "${searchTerm}" with selected tags`
                  : searchTerm
                  ? `No algorithms found matching "${searchTerm}"`
                  : "No algorithms found with selected tags"}
              </p>
              <div className="space-x-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
                  >
                    Clear tags
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelectDropdown;
