import React, { useEffect, useRef, useState } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueViewer = ({ image }) => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);
  const baseWindowRef = useRef({ min: 0, max: 1, width: 1 });

  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(0);

  const applyWindow = (bPct, cPct) => {
    const nv = nvRef.current;
    if (!nv || !nv.volumes || !nv.volumes[0]) return;

    const { min, max, width } = baseWindowRef.current;
    const newWidth = Math.max(1e-6, (1 - cPct / 100) * width);
    const center = min + ((100 - bPct) / 100) * (max - min);

    nv.volumes[0].cal_min = center - newWidth / 2;
    nv.volumes[0].cal_max = center + newWidth / 2;
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
          const baseMin = v.cal_min ?? 0;
          const baseMax = v.cal_max ?? 1;
          const baseWidth = Math.max(1e-6, baseMax - baseMin);
          baseWindowRef.current = {
            min: baseMin,
            max: baseMax,
            width: baseWidth,
          };
          // Use default initial values without capturing state in this effect
          applyWindow(50, 0);
        }
      })
      .catch((err) => console.error("Failed to load image:", err));

    return () => {
      nvRef.current = null;
    };
  }, [image]);

  useEffect(() => {
    applyWindow(brightness, contrast);
  }, [brightness, contrast]);

  const resetSettings = () => {
    setBrightness(50);
    setContrast(0);
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
          {[
            ["Brightness", brightness, setBrightness],
            ["Contrast", contrast, setContrast],
          ].map(([label, value, setValue], idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition-transform hover:scale-105"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <span className="text-xs text-gray-500 mb-2">{value}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md"
              />
            </div>
          ))}
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
