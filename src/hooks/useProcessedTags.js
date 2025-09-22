import { useMemo } from "react";
import { getSupportedGroupIds, TAG_DELIMITER, DEFAULT_TAG_VALUE, isGroupedTag, parseGroupedTag } from "../config/tagGroups";

const useProcessedTags = (rawTags = [], data = []) => {
  const processedTags = useMemo(() => {
    if (!Array.isArray(rawTags)) return { grouped: {}, ungrouped: [], all: [] };

    const grouped = {};
    const ungrouped = [];
    const all = [];

    const supportedGroups = getSupportedGroupIds();

    rawTags.forEach(tag => {
      if (typeof tag !== 'string') return;
      
      if (isGroupedTag(tag)) {
        const parsed = parseGroupedTag(tag);
        if (parsed) {
          if (!grouped[parsed.groupId]) {
            grouped[parsed.groupId] = [];
          }
          grouped[parsed.groupId].push({
            original: parsed.original,
            group: parsed.groupId,
            value: parsed.value,
            displayName: parsed.value
          });
          all.push(tag);
        }
      } else {
        // Regular tag without group identifier
        ungrouped.push(tag);
        all.push(tag);
      }
    });

    return { grouped, ungrouped, all };
  }, [rawTags]);

  // Get all grouped and ungrouped tags from all algorithms
  const allProcessedTags = useMemo(() => {
    if (!Array.isArray(data)) return { grouped: {}, ungrouped: [], all: [] };

    const allGrouped = {};
    const allUngroupedSet = new Set();
    const allTagsSet = new Set();

    const supportedGroups = getSupportedGroupIds();
    
    // Track which algorithms have which groups so NA can be added 
    const algorithmGroups = new Map();

    data.forEach((item, index) => {
      const itemGroups = new Set();
      
      // Process tags if they exist
      if (item.tags && Array.isArray(item.tags)) {
      
        item.tags.forEach(tag => {
          if (typeof tag !== 'string') return;
          
          if (isGroupedTag(tag)) {
            const parsed = parseGroupedTag(tag);
            if (parsed) {
              if (!allGrouped[parsed.groupId]) {
                allGrouped[parsed.groupId] = new Set();
              }
              allGrouped[parsed.groupId].add(parsed.value);
              itemGroups.add(parsed.groupId);
              allTagsSet.add(tag);
            }
          } else {
            allUngroupedSet.add(tag);
            allTagsSet.add(tag);
          }
        });
      }
      
      algorithmGroups.set(index, itemGroups);
    });

    // Add NA values for missing groups
    supportedGroups.forEach(groupId => {
      if (!allGrouped[groupId]) {
        allGrouped[groupId] = new Set();
      }
      
      // Check if any algorithm is missing this group
      const hasAlgorithmWithoutGroup = Array.from(algorithmGroups.values())
        .some(groups => !groups.has(groupId));
      
      if (hasAlgorithmWithoutGroup) {
        allGrouped[groupId].add(DEFAULT_TAG_VALUE);
        allTagsSet.add(`${groupId}${TAG_DELIMITER}${DEFAULT_TAG_VALUE}`);
      }
    });

    const processedGrouped = {};
    Object.keys(allGrouped).forEach(groupId => {
      processedGrouped[groupId] = Array.from(allGrouped[groupId]).sort((a, b) => {
        if (a === DEFAULT_TAG_VALUE) return 1;
        if (b === DEFAULT_TAG_VALUE) return -1;
        return a.localeCompare(b);
      });
    });

    return {
      grouped: processedGrouped,
      ungrouped: Array.from(allUngroupedSet).sort(),
      all: Array.from(allTagsSet).sort()
    };
  }, [data]);

  const getAlgorithmProcessedTags = useMemo(() => {
    return (algorithmTags = []) => {
      const supportedGroups = getSupportedGroupIds();
      const grouped = {};
      const ungrouped = [];

      algorithmTags.forEach(tag => {
        if (typeof tag !== 'string') return;
        
        if (isGroupedTag(tag)) {
          const parsed = parseGroupedTag(tag);
          if (parsed) {
            if (!grouped[parsed.groupId]) {
              grouped[parsed.groupId] = [];
            }
            grouped[parsed.groupId].push({
              original: parsed.original,
              group: parsed.groupId,
              value: parsed.value,
              displayName: parsed.value
            });
          }
        } else {
          ungrouped.push(tag);
        }
      });

      // Add NA for missing groups
      supportedGroups.forEach(groupId => {
        if (!grouped[groupId]) {
          grouped[groupId] = [{
            original: `${groupId}${TAG_DELIMITER}${DEFAULT_TAG_VALUE}`,
            group: groupId,
            value: DEFAULT_TAG_VALUE,
            displayName: DEFAULT_TAG_VALUE
          }];
        }
      });

      return { grouped, ungrouped };
    };
  }, []);

  return {
    processedTags,
    allProcessedTags,
    getAlgorithmProcessedTags
  };
};

export default useProcessedTags;
