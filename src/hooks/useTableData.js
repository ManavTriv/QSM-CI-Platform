import { useState, useMemo } from "react";
import useProcessedTags from "./useProcessedTags";

const useTableData = (data = []) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [isSorting, setIsSorting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { getAlgorithmProcessedTags } = useProcessedTags([], data);

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
        // Get processed tags for this algorithm (handles empty tags by adding NA values)
        const { grouped, ungrouped } = getAlgorithmProcessedTags(
          item.tags || []
        );

        // Create a list of all tags this algorithm has (including NA values for missing groups)
        const algorithmTags = [...ungrouped];
        Object.entries(grouped).forEach(([groupId, groupTags]) => {
          groupTags.forEach((tagObj) => {
            algorithmTags.push(tagObj.original);
          });
        });

        return selectedTags.every((tag) => algorithmTags.includes(tag));
      });
    }

    return filtered;
  }, [data, searchTerm, selectedTags]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !filteredData.length) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA == null && valueB == null) return 0;
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
