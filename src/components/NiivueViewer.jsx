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
      if (nvRef.current) {
        nvRef.current = null;
      }
    };
  }, [image]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        paddingTop: 5, 
      }}
    >
      <div
        style={{
          width: 900,
          height: 350,
          border: "3px solid #818cf8", 
          borderRadius: 8,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          width={900}
          height={350}
          style={{ display: "block", maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default NiivueViewer;
