import { useLocation } from "react-router-dom";
import useProcessedData from "../hooks/useProcessedData";
import useProcessedTags from "../hooks/useProcessedTags";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import MessageCard from "../components/MessageCard";
import NiivueViewer from "../components/NiivueViewer/NiivueViewer";
import { Code, Tag, FileText, Image, Layers } from "lucide-react";

const AlgorithmContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const algorithmName = searchParams.get("name");
  const { data, error, loading } = useProcessedData();
  const { getAlgorithmProcessedTags } = useProcessedTags([], data || []);

  if (error) return <ErrorMessage message="Error loading data" />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading algorithm data"
        description="Fetching algorithm information..."
      />
    );
  if (!algorithmName) return <ErrorMessage message="No algorithm selected" />;

  const algorithmData = data?.find((item) => item.name === algorithmName);
  if (!algorithmData)
    return <ErrorMessage message={`Algorithm "${algorithmName}" not found`} />;

  const { tags, algorithmDescription, url } = algorithmData;
  const { grouped: groupedTags, ungrouped: ungroupedTags } =
    getAlgorithmProcessedTags(tags);

  return (
    <div className="space-y-8">
      <MessageCard
        icon={Code}
        title={algorithmName}
        subtitle="Algorithm details and visualization"
      >
        <div className="space-y-3">
          <div className="bg-indigo-50 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <Tag className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="w-full">
                <h3 className="font-semibold text-stone-800 mb-1 text-base">
                  Tags
                </h3>
                {Object.keys(groupedTags).length > 0 ||
                ungroupedTags.length > 0 ? (
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

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-stone-800 mb-1 text-base">
                  Description
                </h3>
                <div className="text-sm text-stone-700 leading-relaxed">
                  {algorithmDescription && algorithmDescription.trim()
                    ? algorithmDescription
                    : "No description is available for this algorithm."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MessageCard>

      {url && (
        <MessageCard
          icon={Image}
          title="Algorithm Visualization"
          subtitle="Interactive 3D view of the algorithm output"
        >
          <div className="bg-white rounded-lg overflow-hidden">
            <NiivueViewer image={url} algorithmName={algorithmName} />
          </div>
        </MessageCard>
      )}
    </div>
  );
};

const Algorithm = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <AlgorithmContent />
        </div>
      </div>
    </div>
  );
};

export default Algorithm;
