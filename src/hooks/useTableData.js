import { useState, useMemo } from "react";

const useTableData = (data) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [isSorting, setIsSorting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const requestSort = (key) => {
    if (isSorting) return;

    setIsSorting(true);
    let direction = "high-to-low";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "high-to-low") {
        direction = "low-to-high";
      } else if (sortConfig.direction === "low-to-high") {
        direction = null;
        key = null;
      }
    }
    setSortConfig({ key, direction });

    setTimeout(() => setIsSorting(false), 100);
  };

  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) => {
        // If algorithm has no tags or undefined tags, exclude it when tags are selected
        if (!item.tags || !Array.isArray(item.tags) || item.tags.length === 0) {
          return false;
        }
        // Check if algorithm has any of the selected tags
        return selectedTags.some((tag) => item.tags.includes(tag));
      });
    }

    return filtered;
  }, [data, searchTerm, selectedTags]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...filteredData];

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA > valueB) {
        return sortConfig.direction === "high-to-low" ? -1 : 1;
      }
      if (valueA < valueB) {
        return sortConfig.direction === "high-to-low" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return {
    sortConfig,
    searchTerm,
    selectedTags,
    sortedData,
    requestSort,
    setSearchTerm,
    setSelectedTags,
    clearFilters,
  };
};

export default useTableData;
