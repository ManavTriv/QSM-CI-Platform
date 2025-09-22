import { Image } from "lucide-react";
import MessageCard from "../MessageCard";
import NiivueViewer from "../NiivueViewer/NiivueViewer";

const AlgorithmVisualization = ({ url, algorithmName }) => {
  if (!url) return null;

  return (
    <MessageCard
      icon={Image}
      title="Algorithm Visualization"
      subtitle="Interactive 3D view of the algorithm output"
    >
      <div className="bg-white rounded-lg overflow-hidden">
        <NiivueViewer image={url} algorithmName={algorithmName} />
      </div>
    </MessageCard>
  );
};

export default AlgorithmVisualization;
