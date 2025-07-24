import React, { useEffect, useRef } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueViewer = ({ image }) => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);

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

    nv.loadVolumes([{ url: image }])
      .then(() => {
        nv.setSliceType(nv.sliceTypeMultiplanar);
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
      });

    return () => {
      nvRef.current = null;
    };
  }, [image]);

  return (
    <div className="max-w-[1200px] gap-4 mx-auto flex justify-between px-4">
      <div className="w-[850px] h-[337px] border border-indigo-300 rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={850}
          height={337}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <div className="w-[280px] h-[337px] flex flex-col justify-center items-center bg-indigo-50 rounded-xl p-4">
        <div className="space-y-8 w-full max-w-[240px]">
          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition-transform hover:scale-105">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Brightness
            </label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md"
              disabled
            />
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition-transform hover:scale-105">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Contrast
            </label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NiivueViewer;
