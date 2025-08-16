import { Users, TrendingUp, Eye } from "lucide-react";
import MessageCard from "./MessageCard";
import InfoSection from "./InfoSection";

const CompareMessage = () => {
  return (
    <MessageCard
      icon={Users}
      title="ELO Ranking System"
      subtitle="Community-driven algorithm comparison and ranking"
    >
      <div className="space-y-3">
        <InfoSection
          icon={Users}
          title="Community-Driven Ranking"
          variant="primary"
        >
          This is a{" "}
          <span className="font-medium">community-driven ranking system</span>{" "}
          that compares algorithms based on their{" "}
          <span className="font-medium">susceptibility maps</span>.
        </InfoSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoSection
            icon={TrendingUp}
            title="ELO Metric Results"
            variant="secondary"
          >
            The results correspond to the{" "}
            <span className="font-medium">ELO metric</span> for each algorithm.
          </InfoSection>

          <InfoSection
            icon={Eye}
            title="Interactive Comparison"
            variant="secondary"
          >
            Select the <span className="font-medium">susceptibility map</span>{" "}
            below that you believe is better. The algorithm names will then be
            revealed and their ELO scores updated.
          </InfoSection>
        </div>
      </div>
    </MessageCard>
  );
};

export default CompareMessage;
