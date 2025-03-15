import React, { useEffect, useRef } from "react";
import { Niivue } from "@niivue/niivue";

const NiivueTest = () => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const nv = new Niivue();
      nvRef.current = nv;

      nv.attachToCanvas(canvasRef.current);

      const imageUrl = "https://niivue.github.io/niivue/images/mni152.nii.gz";
      console.log("Loading image from URL:", imageUrl);
      nv.loadVolumes([{ url: imageUrl }])
        .then(() => {
          console.log("Image loaded successfully");
          nv.setSliceType(nv.sliceTypeMultiplanar);
        })
        .catch((error) => {
          console.error("Failed to load image:", error);
        });

      return () => {
        if (nvRef.current) {
          const canvas = canvasRef.current;
          if (canvas) {
            const newCanvas = canvas.cloneNode(false);
            canvas.replaceWith(newCanvas);
          }
          nvRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: "50%", height: "50%" }}></canvas>
    </div>
  );
};

export default NiivueTest;
