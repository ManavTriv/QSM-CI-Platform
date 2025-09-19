import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import ImageSelectDropdown from "./ImageSelectDropdown";
import useImageSelect from "../../hooks/useImageSelect";
import { ChevronDown, XCircle } from "lucide-react";

const ImageSelect = ({ setImage }) => {
  const {
    // Data
    data,
    error,
    loading,
    filteredData,
    selectedName,
    selectedUrl,

    // State
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    isOpen,
    dropdownWidth,
    buttonRef,

    // Actions
    handleSelect,
    clearSelection,
    toggleDropdown,
  } = useImageSelect(setImage);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) {
    return (
      <LoadingSpinner
        message="Loading algorithms"
        description="Fetching available algorithms..."
      />
    );
  }

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

      <ImageSelectDropdown
        isOpen={isOpen}
        dropdownWidth={dropdownWidth}
        data={data}
        filteredData={filteredData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedUrl={selectedUrl}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default ImageSelect;
