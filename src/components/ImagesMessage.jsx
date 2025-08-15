import { ChevronDown, RotateCw, SlidersHorizontal } from "lucide-react";

const ImagesMessage = () => {
  return (
    <div className="px-2 mx-4 overflow-x-auto space-y-3">
      <h1 className="font-radio text-indigo-400 font-semibold">
        QSM Medical Image Viewer
      </h1>
      <div className="space-y-3 text-[0.9375rem] text-stone-800 font-radio">
        <div className="flex items-start gap-2">
          <ChevronDown className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            Select an <span className="font-medium">algorithm</span> using the
            dropdown below to view the{" "}
            <span className="font-medium">
              corresponding susceptibility map
            </span>
            .
          </span>
        </div>
        <div className="flex items-start gap-2">
          <RotateCw className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            The viewer supports{" "}
            <span className="font-medium">drag and drop</span> functionality to
            rotate and view different segments of the image.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <SlidersHorizontal className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            <span className="font-medium">Brightness and contrast</span> of the
            susceptibility maps can be adjusted using the sliders below.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImagesMessage;
