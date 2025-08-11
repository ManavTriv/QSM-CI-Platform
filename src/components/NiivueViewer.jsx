import React, { useEffect, useRef, useState } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueViewer = ({ image }) => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);
  const initialWindowRef = useRef({ min: 0, max: 1 });

  const [windowMin, setWindowMin] = useState(null);
  const [windowMax, setWindowMax] = useState(null);

  const formatNumber = (n) => (Number.isFinite(n) ? n.toFixed(3) : "");

  const applyWindow = (minVal, maxVal) => {
    const nv = nvRef.current;
    if (!nv || !nv.volumes || !nv.volumes[0]) return;

    const epsilon = 1e-6;
    let newMin = Number.isFinite(minVal) ? minVal : initialWindowRef.current.min;
    let newMax = Number.isFinite(maxVal) ? maxVal : initialWindowRef.current.max;

    if (newMax - newMin < epsilon) {
      newMax = newMin + epsilon;
    }

    nv.volumes[0].cal_min = newMin;
    nv.volumes[0].cal_max = newMax;
    nv.updateGLVolume();
  };

  useEffect(() => {
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
          const baseMin = Number.isFinite(v.cal_min) ? v.cal_min : 0;
          const baseMax = Number.isFinite(v.cal_max) ? v.cal_max : 1;
          initialWindowRef.current = { min: baseMin, max: baseMax };
          setWindowMin(baseMin);
          setWindowMax(baseMax);
          applyWindow(baseMin, baseMax);
        }
      })
      .catch((err) => console.error("Failed to load image:", err));

    return () => {
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

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 min-w-0 border border-indigo-300 rounded-xl overflow-hidden aspect-[2.5/1]">
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-contain"
        />
      </div>
      <div className="w-full md:w-[280px] flex-shrink-0 bg-indigo-50 rounded-xl p-4 flex flex-col justify-center items-center">
        <div className="space-y-8 w-full max-w-[240px]">
          {(() => {
            const sliderMin = initialWindowRef.current.min ?? 0;
            const sliderMax = initialWindowRef.current.max ?? 1;
            const epsilon = 1e-6;
            const range = Math.max(epsilon, sliderMax - sliderMin);
            const step = range / 500; 

            return (
              <>
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition-transform hover:scale-105">
                  <label className="text-sm font-medium text-gray-700 mb-1">Window Min</label>
                  <span className="text-xs text-gray-500 mb-2">{formatNumber(windowMin)}</span>
                  <input
                    type="range"
                    min={sliderMin}
                    max={sliderMax}
                    step={step}
                    value={Number.isFinite(windowMin) ? windowMin : sliderMin}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      const clamped = Math.min(val, (Number.isFinite(windowMax) ? windowMax : sliderMax) - epsilon);
                      setWindowMin(clamped);
                    }}
                    className="w-full accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition-transform hover:scale-105">
                  <label className="text-sm font-medium text-gray-700 mb-1">Window Max</label>
                  <span className="text-xs text-gray-500 mb-2">{formatNumber(windowMax)}</span>
                  <input
                    type="range"
                    min={sliderMin}
                    max={sliderMax}
                    step={step}
                    value={Number.isFinite(windowMax) ? windowMax : sliderMax}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      const clamped = Math.max(val, (Number.isFinite(windowMin) ? windowMin : sliderMin) + epsilon);
                      setWindowMax(clamped);
                    }}
                    className="w-full accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md"
                  />
                </div>
              </>
            );
          })()}
          <button
            onClick={resetSettings}
            className="w-full text-sm mt-4 bg-indigo-100 text-indigo-600 font-medium py-2 rounded-md hover:bg-indigo-200 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default NiivueViewer;
