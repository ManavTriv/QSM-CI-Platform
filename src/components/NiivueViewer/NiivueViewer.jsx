import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Niivue } from "@niivue/niivue";
import WindowControls from "./WindowControls";
import { ExternalLink } from "lucide-react";

const GLOBAL_MIN = -0.2;
const GLOBAL_MAX = 0.2;

const NiivueViewer = ({ image, algorithmName }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const nvRef = useRef(null);

  const initialWindowRef = useRef({ min: GLOBAL_MIN, max: GLOBAL_MAX });

  const [windowMin, setWindowMin] = useState(null);
  const [windowMax, setWindowMax] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const epsilon = 1e-6;

  const applyWindow = (minVal, maxVal) => {
    const nv = nvRef.current;
    if (!nv || !nv.volumes || !nv.volumes[0]) return;

    let newMin = Number.isFinite(minVal) ? minVal : initialWindowRef.current.min;
    let newMax = Number.isFinite(maxVal) ? maxVal : initialWindowRef.current.max;

    if (newMax - newMin < epsilon) newMax = newMin + epsilon;

    nv.volumes[0].cal_min = newMin;
    nv.volumes[0].cal_max = newMax;
    nv.updateGLVolume();
  };

  const clampToGlobals = (val) => Math.max(GLOBAL_MIN, Math.min(GLOBAL_MAX, val));

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const nv = new Niivue({
      loadingText: "Loading",
      dragAndDropEnabled: true,
      textHeight: "0.02",
      backColor: [0, 0, 0, 1],
      crosshairColor: [244, 243, 238, 0.5],
    });

    nvRef.current = nv;
    nv.attachToCanvas(canvasRef.current);

    nv
      .loadVolumes([{ url: image }])
      .then(() => {
        nv.setSliceType(nv.sliceTypeMultiplanar);

        if (nv.volumes?.[0]) {
          const v = nv.volumes[0];

          const baseMinRaw = Number.isFinite(v.cal_min) ? v.cal_min : GLOBAL_MIN;
          const baseMaxRaw = Number.isFinite(v.cal_max) ? v.cal_max : GLOBAL_MAX;

          let startMin = clampToGlobals(baseMinRaw);
          let startMax = clampToGlobals(baseMaxRaw);

          if (startMax - startMin < epsilon) {
            const mid = clampToGlobals((startMin + startMax) / 2);
            startMin = clampToGlobals(mid - epsilon / 2);
            startMax = clampToGlobals(mid + epsilon / 2);

            if (startMax - startMin < epsilon) {
              startMin = GLOBAL_MIN + (GLOBAL_MAX - GLOBAL_MIN) * 0.499;
              startMax = GLOBAL_MIN + (GLOBAL_MAX - GLOBAL_MIN) * 0.501;
            }
          }

          initialWindowRef.current = { min: startMin, max: startMax };

          setWindowMin(startMin);
          setWindowMax(startMax);
          applyWindow(startMin, startMax);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load image:", err);
        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      if (nvRef.current && typeof nvRef.current.destroy === "function") {
        nvRef.current.destroy();
      }
      nvRef.current = null;
    };
  }, [image]);

  useEffect(() => {
    if (windowMin === null || windowMax === null) return;
    applyWindow(windowMin, windowMax);
  }, [windowMin, windowMax]);

  const resetSettings = () => {
    const { min, max } = initialWindowRef.current;
    setWindowMin(min);
    setWindowMax(max);
  };

  if (hasError) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl font-radio">
          <div className="text-red-600 mb-2">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Failed to Load Image</h3>
          <p className="text-red-600 text-sm">
            Unable to load the medical image. Please try selecting a different algorithm.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row gap-6 font-radio">
      <div className="flex-1 min-w-0 border border-indigo-200 rounded-xl overflow-hidden aspect-[2.5/1] relative bg-white shadow-sm">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
              <p className="text-stone-600 text-sm font-medium">Loading image...</p>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="block w-full h-full object-contain" />
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
              onClick={() => navigate(`/algorithm?name=${encodeURIComponent(algorithmName)}`)}
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
