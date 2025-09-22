import { Info, FileText, BarChart } from "lucide-react";
import { getMetricDescriptions } from "../config/metrics";
import MessageCard from "./MessageCard";
import InfoSection from "./InfoSection";

const MetricOverview = ({ metric }) => {
  const metricDescriptions = getMetricDescriptions();
  const description =
    metricDescriptions[metric] ||
    "No description is available for this metric.";

  return (
    <MessageCard
      icon={BarChart}
      title={`${metric} Analysis`}
      subtitle="Metric overview and performance insights"
    >
      <div className="space-y-3">
        <InfoSection icon={Info} title={`About ${metric}`} variant="primary">
          {description}
        </InfoSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoSection icon={FileText} title="Measurement" variant="secondary">
            Quantifies algorithm performance using standardized evaluation
            criteria
          </InfoSection>

          <InfoSection
            icon={BarChart}
            title="Visualization"
            variant="secondary"
          >
            Interactive scatter plot comparing performance across all algorithms
          </InfoSection>
        </div>
      </div>
    </MessageCard>
  );
};

export default MetricOverview;
