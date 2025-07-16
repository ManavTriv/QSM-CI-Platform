import { useMemo, useRef, useState, useEffect } from "react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import { ChevronDown, XCircle } from "lucide-react";

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
    setImage(newUrl);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedUrl(null);
    setImage(null);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;

  return (
    <div className="relative w-full px-6">
      <div className="flex items-center gap-2 flex-wrap w-full">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`flex-grow flex justify-between items-center px-4 py-2 rounded-full text-sm font-radio shadow-sm transition-colors focus:outline-none ${
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
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label="Clear selection"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-md shadow-xl max-h-64 overflow-auto"
          style={{ width: dropdownWidth }}
        >
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200 z-10">
            <input
              type="text"
              placeholder="Search algorithms..."
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {filteredData.map((item) => (
              <li key={item.url}>
                <button
                  onClick={() => handleSelect(item.url)}
                  className={`w-full text-left px-4 py-2 text-sm font-radio transition-colors ${
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
        </div>
      )}
    </div>
  );
};

export default ImageSelect;