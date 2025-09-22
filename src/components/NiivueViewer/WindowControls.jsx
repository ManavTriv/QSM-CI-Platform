import React from "react";
import * as Slider from "@radix-ui/react-slider";

const GLOBAL_MIN = -0.2;
const GLOBAL_MAX = 0.2;

const WindowControls = ({ windowMin, setWindowMin, windowMax, setWindowMax, onReset, onWindowChange }) => {
  const epsilon = 1e-6;
  const formatNumber = (n) => (Number.isFinite(n) ? n.toFixed(3) : "");

  const sliderMin = GLOBAL_MIN;
  const sliderMax = GLOBAL_MAX;
  const range = Math.max(epsilon, sliderMax - sliderMin);
  const step = range / 500;

  const clampToGlobals = (val) =>
    Math.max(GLOBAL_MIN, Math.min(GLOBAL_MAX, val));

  const clampMin = (val) => {
    const maxAllowed =
      (Number.isFinite(windowMax) ? windowMax : sliderMax) - epsilon;
    return Math.min(Math.max(clampToGlobals(val), sliderMin), maxAllowed);
  };

  const clampMax = (val) => {
    const minAllowed =
      (Number.isFinite(windowMin) ? windowMin : sliderMin) + epsilon;
    return Math.max(Math.min(clampToGlobals(val), sliderMax), minAllowed);
  };

  const handleSliderChange = ([min, max]) => {
    let safeMin = clampToGlobals(min);
    let safeMax = clampToGlobals(max);

    if (safeMax - safeMin < epsilon) {
      safeMax = Math.min(sliderMax, safeMin + epsilon);
    }

    safeMin = Math.max(sliderMin, Math.min(safeMin, safeMax - epsilon));
    safeMax = Math.min(sliderMax, Math.max(safeMax, safeMin + epsilon));

    setWindowMin(safeMin);
    setWindowMax(safeMax);
  };

  const handleSliderCommit = ([min, max]) => {
    onWindowChange(min, max);
  };

  return (
    <div className="space-y-6 w-full max-w-[260px]">
      <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
        <label className="text-sm font-medium text-stone-700 mb-3 block">
          Window (Min / Max)
        </label>

        <Slider.Root
          className="relative flex items-center w-full h-6 select-none touch-none"
          min={sliderMin}
          max={sliderMax}
          step={step}
          value={[
            Number.isFinite(windowMin) ? windowMin : sliderMin,
            Number.isFinite(windowMax) ? windowMax : sliderMax,
          ]}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
        >
          <Slider.Track className="bg-stone-200 relative h-2 rounded-full flex-1">
            <Slider.Range className="absolute h-2 bg-indigo-400 rounded-full" />
          </Slider.Track>
          <Slider.Thumb
            className="w-5 h-5 bg-white border-2 border-indigo-400 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:scale-110"
          />
          <Slider.Thumb
            className="w-5 h-5 bg-white border-2 border-indigo-400 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:scale-110"
          />
        </Slider.Root>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-stone-600 mb-1 font-medium">Min</span>
            <input
              type="number"
              step={step}
              min={GLOBAL_MIN}
              max={GLOBAL_MAX}
              value={Number.isFinite(windowMin) ? windowMin : ""}
              onChange={(e) => {
                const raw = parseFloat(e.target.value);
                if (!Number.isFinite(raw)) return;
                setWindowMin(clampMin(raw));
              }}
              onBlur={() => setWindowMin((v) => clampMin(Number(v)))}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors duration-200 cursor-text"
              placeholder="0.000"
            />
            <span className="text-[10px] mt-1 text-stone-500 font-medium">
              {formatNumber(windowMin)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-stone-600 mb-1 font-medium">Max</span>
            <input
              type="number"
              step={step}
              min={GLOBAL_MIN}
              max={GLOBAL_MAX}
              value={Number.isFinite(windowMax) ? windowMax : ""}
              onChange={(e) => {
                const raw = parseFloat(e.target.value);
                if (!Number.isFinite(raw)) return;
                setWindowMax(clampMax(raw));
              }}
              onBlur={() => setWindowMax((v) => clampMax(Number(v)))}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors duration-200 cursor-text"
              placeholder="0.000"
            />
            <span className="text-[10px] mt-1 text-stone-500 font-medium">
              {formatNumber(windowMax)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full text-sm bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-500 active:bg-indigo-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
      >
        Reset to Original Window
      </button>
    </div>
  );
};

export default WindowControls;
