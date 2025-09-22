import { useEffect, useRef, useState } from "react";
import { Niivue } from "@niivue/niivue";

const GLOBAL_MIN = -0.2;
const GLOBAL_MAX = 0.2;

const useNiivueViewer = (image) => {
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

    let newMin = Number.isFinite(minVal)
      ? minVal
      : initialWindowRef.current.min;
    let newMax = Number.isFinite(maxVal)
      ? maxVal
      : initialWindowRef.current.max;

    if (newMax - newMin < epsilon) newMax = newMin + epsilon;

    nv.volumes[0].cal_min = newMin;
    nv.volumes[0].cal_max = newMax;
    nv.updateGLVolume();
  };

  const clampToGlobals = (val) =>
    Math.max(GLOBAL_MIN, Math.min(GLOBAL_MAX, val));

  const resetSettings = () => {
    const { min, max } = initialWindowRef.current;
    setWindowMin(min);
    setWindowMax(max);
  };

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

    nv.loadVolumes([{ url: image }])
      .then(() => {
        nv.setSliceType(nv.sliceTypeMultiplanar);

        if (nv.volumes?.[0]) {
          const v = nv.volumes[0];

          const baseMinRaw = Number.isFinite(v.cal_min)
            ? v.cal_min
            : GLOBAL_MIN;
          const baseMaxRaw = Number.isFinite(v.cal_max)
            ? v.cal_max
            : GLOBAL_MAX;

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

  return {
    canvasRef,
    windowMin,
    setWindowMin,
    windowMax,
    setWindowMax,
    isLoading,
    hasError,
    resetSettings,
    applyWindow,
  };
};

export default useNiivueViewer;
