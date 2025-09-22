import { useState, useMemo } from "react";
import useProcessedTags from "./useProcessedTags";

const useTagFilter = (data, selectedTags, onTagsChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState("");

  const { allProcessedTags } = useProcessedTags([], data);

  const filteredTags = useMemo(() => {
    let tags = allProcessedTags.all;

    // Filter by search term
    if (tagSearchTerm.trim()) {
      tags = tags.filter((tag) =>
        tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
      );
    }

    // Separate selected and unselected tags
    const selectedTagsFiltered = tags.filter((tag) =>
      selectedTags.includes(tag)
    );
    const unselectedTagsFiltered = tags.filter(
      (tag) => !selectedTags.includes(tag)
    );

    // Pin selected tags to the top
    return [...selectedTagsFiltered, ...unselectedTagsFiltered];
  }, [allProcessedTags.all, tagSearchTerm, selectedTags]);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setTagSearchTerm("");
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const clearTagSearch = () => {
    setTagSearchTerm("");
  };

  return {
    isOpen,
    tagSearchTerm,
    setTagSearchTerm,
    availableTags: allProcessedTags.all,
    filteredTags,
    processedTags: allProcessedTags,
    handleTagToggle,
    clearAllTags,
    toggleDropdown,
    closeDropdown,
    clearTagSearch,
  };
};

export default useTagFilter;
