import { useMemo, useRef, useState, useEffect } from "react";
import useProcessedData from "./useProcessedData";

const useImageSelect = (setImage) => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
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
    if (!data || !Array.isArray(data)) return [];
    
    let filtered = [...data];
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tags 
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) => {
        if (!item?.tags || !Array.isArray(item.tags) || item.tags.length === 0) {
          return false;
        }
        return selectedTags.every((tag) => item.tags.includes(tag));
      });
    }
    
    return filtered.map(({ url, name }) => ({ url, name }));
  }, [data, searchTerm, selectedTags]);

  const selectedName = useMemo(() => {
    if (!selectedUrl || !data || !Array.isArray(data)) {
      return "Select an algorithm";
    }
    return data.find((item) => item.url === selectedUrl)?.name || "Select an algorithm";
  }, [data, selectedUrl]);

  const handleSelect = (url) => {
    const newUrl = selectedUrl === url ? null : url;
    setSelectedUrl(newUrl);
    
    const algorithmName = newUrl && data && Array.isArray(data) 
      ? data.find((item) => item.url === newUrl)?.name || null 
      : null;
    
    setImage(newUrl, algorithmName);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedUrl(null);
    setImage(null, null);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return {
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
  };
};

export default useImageSelect;
