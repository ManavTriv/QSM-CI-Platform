import { Tag } from "lucide-react";

const AlgorithmTags = ({ groupedTags, ungroupedTags }) => {
  const hasAnyTags =
    Object.keys(groupedTags).length > 0 || ungroupedTags.length > 0;

  return (
    <div className="bg-indigo-50 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <Tag className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div className="w-full">
          <h3 className="font-semibold text-stone-800 mb-1 text-base">Tags</h3>
          {hasAnyTags ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Grouped Tags */}
              {Object.entries(groupedTags).map(([groupId, groupTags]) =>
                groupTags.map((tagObj) => (
                  <span
                    key={tagObj.original}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border ${
                      tagObj.value === "NA"
                        ? "bg-gray-100 text-gray-700 border-gray-200"
                        : "bg-indigo-100 text-indigo-700 border-indigo-200"
                    }`}
                  >
                    {groupId.charAt(0).toUpperCase() + groupId.slice(1)}:{" "}
                    {tagObj.displayName}
                  </span>
                ))
              )}

              {/* Ungrouped Tags */}
              {ungroupedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-sm text-stone-600">
              No tags are available for this algorithm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmTags;
