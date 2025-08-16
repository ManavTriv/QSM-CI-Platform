import { ChevronDown, RotateCw, SlidersHorizontal } from "lucide-react";
import MessageCard from "./MessageCard";
import InfoSection from "./InfoSection";

const ImagesMessage = () => {
  return (
    <MessageCard
      icon={ChevronDown}
      title="QSM Medical Image Viewer"
      subtitle="Interactive 3D visualization of susceptibility maps"
    >
      <div className="space-y-3">
        <InfoSection
          icon={ChevronDown}
          title="Algorithm Selection"
          variant="primary"
        >
          Select an <span className="font-medium">algorithm</span> using the
          dropdown below to view the{" "}
          <span className="font-medium">corresponding susceptibility map</span>.
        </InfoSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoSection
            icon={RotateCw}
            title="Interactive Controls"
            variant="secondary"
          >
            The viewer supports{" "}
            <span className="font-medium">drag and drop</span> functionality to
            rotate and view different segments of the image.
          </InfoSection>

          <InfoSection
            icon={SlidersHorizontal}
            title="Image Adjustments"
            variant="secondary"
          >
            <span className="font-medium">Brightness and contrast</span> of the
            susceptibility maps can be adjusted using the sliders below.
          </InfoSection>
        </div>
      </div>
    </MessageCard>
  );
};

export default ImagesMessage;
