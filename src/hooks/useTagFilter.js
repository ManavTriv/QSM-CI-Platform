import { useState, useMemo } from "react";

const useTagFilter = (data, selectedTags, onTagsChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState("");

  const availableTags = useMemo(() => {
    const tagSet = new Set();
    data.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [data]);

  const filteredTags = useMemo(() => {
    let tags = availableTags;
    
    // Filter by search term
    if (tagSearchTerm.trim()) {
      tags = tags.filter(tag => 
        tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
      );
    }
    
    // Separate selected and unselected tags
    const selectedTagsFiltered = tags.filter(tag => selectedTags.includes(tag));
    const unselectedTagsFiltered = tags.filter(tag => !selectedTags.includes(tag));
    
    // Pin selected tags to the top
    return [...selectedTagsFiltered, ...unselectedTagsFiltered];
  }, [availableTags, tagSearchTerm, selectedTags]);

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
    availableTags,
    filteredTags,
    handleTagToggle,
    clearAllTags,
    toggleDropdown,
    closeDropdown,
    clearTagSearch,
  };
};

export default useTagFilter;