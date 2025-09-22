import { Search, X } from "lucide-react";

const TableSearch = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search algorithms...",
}) => {
  return (
    <div className="relative">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 sm:py-2 text-sm font-radio border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 hover:text-stone-600 cursor-pointer"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-xs text-stone-600 mt-1 font-radio">
          Search results for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default TableSearch;
