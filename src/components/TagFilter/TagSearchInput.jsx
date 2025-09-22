import { Search, X } from "lucide-react";

const TagSearchInput = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400" />
      <input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-7 pr-7 py-1.5 text-xs font-radio border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400 hover:text-stone-600 cursor-pointer"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default TagSearchInput;
