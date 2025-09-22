import { useLocation } from "react-router-dom";
import useProcessedData from "../hooks/useProcessedData";
import useProcessedTags from "../hooks/useProcessedTags";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import MessageCard from "../components/MessageCard";
import AlgorithmTags from "../components/Algorithm/AlgorithmTags";
import AlgorithmDescription from "../components/Algorithm/AlgorithmDescription";
import AlgorithmVisualization from "../components/Algorithm/AlgorithmVisualization";
import PageLayout from "../components/Layout/PageLayout";
import { Code } from "lucide-react";

const Algorithm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const algorithmName = searchParams.get("name");

  const { data, error, loading } = useProcessedData();
  const { getAlgorithmProcessedTags } = useProcessedTags([], data || []);

  if (error) {
    return (
      <PageLayout>
        <ErrorMessage message="Error loading data" />
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner
          message="Loading algorithm data"
          description="Fetching algorithm information..."
        />
      </PageLayout>
    );
  }

  if (!algorithmName) {
    return (
      <PageLayout>
        <ErrorMessage message="No algorithm selected" />
      </PageLayout>
    );
  }

  const algorithmData = data?.find((item) => item.name === algorithmName);

  if (!algorithmData) {
    return (
      <PageLayout>
        <ErrorMessage message={`Algorithm "${algorithmName}" not found`} />
      </PageLayout>
    );
  }

  const { tags, algorithmDescription, url } = algorithmData;
  const { grouped: groupedTags, ungrouped: ungroupedTags } =
    getAlgorithmProcessedTags(tags);

  return (
    <PageLayout>
      <MessageCard
        icon={Code}
        title={algorithmName}
        subtitle="Algorithm details and visualization"
      >
        <div className="space-y-3">
          <AlgorithmTags
            groupedTags={groupedTags}
            ungroupedTags={ungroupedTags}
          />
          <AlgorithmDescription description={algorithmDescription} />
        </div>
      </MessageCard>

      <AlgorithmVisualization url={url} algorithmName={algorithmName} />
    </PageLayout>
  );
};

export default Algorithm;
