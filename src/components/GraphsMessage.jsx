import { BarChart3, TrendingUp, Palette, Settings } from "lucide-react";
import MessageCard from "./MessageCard";
import InfoSection from "./InfoSection";

const GraphsMessage = () => {
  return (
    <MessageCard
      icon={BarChart3}
      title="Interactive Algorithm Visualization"
      subtitle="Explore algorithm performance through customizable scatter plots and metric comparisons"
    >
      <div className="space-y-3">
        <InfoSection
          icon={BarChart3}
          title="Scatter Plot Analysis"
          variant="primary"
        >
          Select any <span className="font-medium">metric combination</span> for
          X and Y axes. Each point represents an algorithm with{" "}
          <span className="font-medium">hover details</span>.
        </InfoSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoSection
            icon={TrendingUp}
            title="Metric Comparison"
            variant="secondary"
          >
            Compare performance across{" "}
            <span className="font-medium">evaluation metrics</span> like RMSE,
            HFEN, MAD to identify patterns.
          </InfoSection>

          <InfoSection icon={Palette} title="Group by Tags" variant="secondary">
            Color-code algorithms by{" "}
            <span className="font-medium">tag groups</span> (e.g., Type) to
            visualize performance differences with a legend.
          </InfoSection>
        </div>

        <InfoSection
          icon={Settings}
          title="Customization Controls"
          variant="tertiary"
        >
          Select X/Y axis metrics and grouping options. Hover over points for
          detailed information.
        </InfoSection>
      </div>
    </MessageCard>
  );
};

export default GraphsMessage;
