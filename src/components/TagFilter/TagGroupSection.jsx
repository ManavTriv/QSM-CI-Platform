import { Tag } from "lucide-react";

const TagGroupSection = ({
  groupId,
  groupTitle,
  tags,
  selectedTags,
  onTagToggle,
}) => {
  if (tags.length === 0) return null;

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 px-2 py-1 mb-1">
        <Tag className="w-3 h-3 text-indigo-500" />
        <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
          {groupTitle}
        </span>
      </div>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm font-radio rounded transition-colors cursor-pointer ${
              isSelected
                ? "bg-indigo-200 text-indigo-800 border border-indigo-300"
                : "text-stone-700 hover:bg-gray-50"
            }`}
          >
            <Tag className="w-3 h-3" />
            <span className="truncate">
              {groupId ? tag.split("::")[1] : tag}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TagGroupSection;
