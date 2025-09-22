/**
 * Tag Groups Configuration
 * 
 * To add a new tag group, add an entry to the TAG_GROUPS array.
 * 
 * Fromat:
 * - id: unique identifier (lowercase, used in tag format like "id::value")
 * - displayName: human-readable name shown in UI
 * - description: brief description of what this tag group represents
 * 
 * Example tag format: "type::Deep Learning" where "type" is the id and "Deep Learning" is the value
 */

export const TAG_GROUPS = [
  {
    id: 'type',
    displayName: 'Type',
    description: 'Algorithm type or category (e.g., Deep Learning, Iterative)',
  },
  // Add new tag groups here following the same pattern
  // {
  //   id: 'complexity',
  //   displayName: 'Complexity',
  //   description: 'Algorithm computational complexity level',
  // },
];

/**
 * Delimeter used to separate ID from value
 */
export const TAG_DELIMITER = '::';

/**
 * Default value if no value is provided for an ID
 */
export const DEFAULT_TAG_VALUE = 'NA';

export const getSupportedGroupIds = () => TAG_GROUPS.map(group => group.id);

export const getGroupConfig = (groupId) => TAG_GROUPS.find(group => group.id === groupId);

export const isGroupedTag = (tag) => {
  if (typeof tag !== 'string') return false;
  const parts = tag.split(TAG_DELIMITER);
  return parts.length === 2 && getSupportedGroupIds().includes(parts[0].toLowerCase());
};

export const parseGroupedTag = (tag) => {
  if (!isGroupedTag(tag)) return null;
  const [groupId, value] = tag.split(TAG_DELIMITER).map(part => part.trim());
  return {
    groupId: groupId.toLowerCase(),
    value,
    original: tag
  };
};
