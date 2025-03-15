import React, { useEffect, useRef } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueViewer = ({ image }) => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);

  useEffect(() => {
    // Create a new Niivue instance
    const nv = new Niivue({
      loadingText: "Loading",
      dragAndDropEnabled: true,
      textHeight: "0.02",
      backColor: [0, 0, 0, 1],
      crosshairColor: [244, 243, 238, 0.5],
    });
    
    nvRef.current = nv;

    // Attach to the canvas
    nv.attachToCanvas(canvasRef.current);

    // Load the new image
    console.log("Loading image from URL:", image);
    nv.loadVolumes([{ url: image }])
      .then(() => {
        console.log("Image loaded successfully");
        nv.setSliceType(nv.sliceTypeMultiplanar);
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
      });

    // Cleanup function
    return () => {
      if (nvRef.current) {
        nvRef.current = null;
      }
    };
  }, [image]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        width="512"
        height="512"
        style={{ display: "block", maxWidth: "100%" }}
      ></canvas>
    </div>
  );
};

export default NiivueViewer;