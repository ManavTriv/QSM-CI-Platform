import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import WindowControls from "./WindowControls";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import useNiivueViewer from "../../hooks/useNiivueViewer";

const NiivueViewer = ({ image, algorithmName }) => {
  const navigate = useNavigate();
  const {
    canvasRef,
    windowMin,
    setWindowMin,
    windowMax,
    setWindowMax,
    isLoading,
    hasError,
    resetSettings,
    applyWindow,
  } = useNiivueViewer(image);

  if (hasError) {
    return <ErrorState />;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row gap-6 font-radio">
      <div className="flex-1 min-w-0 border border-indigo-200 rounded-xl overflow-hidden aspect-[2.5/1] relative bg-white shadow-sm">
        {isLoading && <LoadingState />}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-contain"
        />
      </div>

      <div className="w-full md:w-[320px] flex-shrink-0 bg-white rounded-xl p-6 flex flex-col justify-center items-center border border-indigo-100 shadow-sm space-y-6">
        <WindowControls
          windowMin={windowMin}
          setWindowMin={setWindowMin}
          windowMax={windowMax}
          setWindowMax={setWindowMax}
          onReset={resetSettings}
          onWindowChange={applyWindow}
        />

        {algorithmName && (
          <div className="w-full">
            <button
              onClick={() =>
                navigate(`/algorithm?name=${encodeURIComponent(algorithmName)}`)
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 font-radio text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Algorithm Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NiivueViewer;
