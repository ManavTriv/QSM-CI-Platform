import { Table, BarChart2, Info } from "lucide-react";
import MessageCard from "./MessageCard";
import InfoSection from "./InfoSection";

const OverviewMessage = () => {
  return (
    <MessageCard
      icon={Table}
      title="Algorithm and Metric Overview"
      subtitle="Comprehensive analysis of QSM algorithms and performance metrics"
    >
      <div className="space-y-3">
        <InfoSection
          icon={Table}
          title="Algorithm Metrics Table"
          variant="primary"
        >
          This table provides an overview of the{" "}
          <span className="font-medium">QSM algorithms</span>, along with their
          corresponding <span className="font-medium">metric values</span>.
        </InfoSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoSection
            icon={BarChart2}
            title="ELO Rating System"
            variant="secondary"
          >
            The <span className="font-medium">ELO rating</span> is a
            community-driven metric that scores the algorithms against each
            other based on their{" "}
            <span className="font-medium">susceptibility maps</span>.
          </InfoSection>

          <InfoSection
            icon={Info}
            title="Interactive Navigation"
            variant="secondary"
          >
            To view more details about a{" "}
            <span className="font-medium">metric</span> or{" "}
            <span className="font-medium">algorithm</span>, click on the
            respective name in the table.
          </InfoSection>
        </div>
      </div>
    </MessageCard>
  );
};

export default OverviewMessage;
