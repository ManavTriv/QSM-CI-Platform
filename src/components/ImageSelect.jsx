import { useMemo, useRef, useState, useEffect } from "react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { ChevronDown, XCircle, Search, X } from "lucide-react";

const ImageSelect = ({ setImage }) => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(null);
  const buttonRef = useRef(null);

  const { data, error, loading } = useProcessedData();

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    const items = searchTerm
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data;
    return items.map(({ url, name }) => ({ url, name }));
  }, [data, searchTerm]);

  const selectedName = useMemo(
    () =>
      selectedUrl
        ? data.find((item) => item.url === selectedUrl)?.name
        : "Select an algorithm",
    [data, selectedUrl]
  );

  const handleSelect = (url) => {
    const newUrl = selectedUrl === url ? null : url;
    setSelectedUrl(newUrl);
    const algorithmName = newUrl ? data.find((item) => item.url === newUrl)?.name : null;
    setImage(newUrl, algorithmName);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedUrl(null);
    setImage(null, null);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading algorithms"
        description="Fetching available algorithms..."
      />
    );

  return (
    <div className="relative w-full px-6">
      <div className="flex items-center gap-2 flex-wrap w-full">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`flex-grow cursor-pointer flex justify-between items-center px-4 py-2 rounded-full text-sm font-radio shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            selectedUrl
              ? "bg-indigo-400 text-white"
              : "bg-gray-100 text-stone-800 hover:bg-indigo-100 hover:text-indigo-500"
          }`}
        >
          <span className="truncate">{selectedName}</span>
          <ChevronDown
            className={`h-4 w-4 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {selectedUrl && (
          <button
            onClick={clearSelection}
            className="text-red-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full cursor-pointer"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-md shadow-xl max-h-64 overflow-auto min-w-[12rem] max-w-full"
          style={{ width: dropdownWidth }}
        >
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200 z-10">
            <div className="relative">
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
          </div>

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
                No algorithms found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageSelect;
