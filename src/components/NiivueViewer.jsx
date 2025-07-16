import React, { useEffect, useRef } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueViewer = ({ image }) => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const nv = new Niivue({
      loadingText: "Loading",
      dragAndDropEnabled: true,
      textHeight: 0.02, // Changed from string to number
      backColor: [0, 0, 0, 1],
      crosshairColor: [244, 243, 238, 0.5],
      isHighResolutionCapable: true, // Added for better quality
    });

    nvRef.current = nv;

    nv.attachToCanvas(canvasRef.current);

    nv.loadVolumes([{ url: image }])
      .then(() => {
        nv.setSliceType(nv.sliceTypeMultiplanar);
        nv.updateGLVolume(); // Ensure proper rendering
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
      });

    // Handle window resize
    const handleResize = () => {
      if (nvRef.current) {
        nvRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (nvRef.current) {
        nvRef.current.destroy(); // Proper cleanup
        nvRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [image]);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        style={{ 
          display: "block", 
          maxWidth: "100%",
          aspectRatio: "1/1" // Maintain square aspect ratio
        }}
      />
    </div>
  );
};

export default NiivueViewer;