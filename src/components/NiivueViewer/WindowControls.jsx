import React from "react";
import useWindowControls from "../../hooks/useWindowControls";
import WindowSlider from "./WindowSlider";
import WindowInput from "./WindowInput";

const WindowControls = ({
  windowMin,
  setWindowMin,
  windowMax,
  setWindowMax,
  onReset,
  onWindowChange,
}) => {
  const {
    sliderMin,
    sliderMax,
    step,
    formatNumber,
    handleSliderChange,
    handleSliderCommit,
    handleMinInputChange,
    handleMaxInputChange,
    handleMinInputBlur,
    handleMaxInputBlur,
    GLOBAL_MIN,
    GLOBAL_MAX,
  } = useWindowControls(
    windowMin,
    setWindowMin,
    windowMax,
    setWindowMax,
    onWindowChange
  );

  return (
    <div className="space-y-6 w-full max-w-[260px]">
      <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
        <label className="text-sm font-medium text-stone-700 mb-3 block">
          Window (Min / Max)
        </label>

        <WindowSlider
          sliderMin={sliderMin}
          sliderMax={sliderMax}
          step={step}
          windowMin={windowMin}
          windowMax={windowMax}
          onSliderChange={handleSliderChange}
          onSliderCommit={handleSliderCommit}
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <WindowInput
            label="Min"
            value={windowMin}
            step={step}
            min={GLOBAL_MIN}
            max={GLOBAL_MAX}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            formatNumber={formatNumber}
          />
          <WindowInput
            label="Max"
            value={windowMax}
            step={step}
            min={GLOBAL_MIN}
            max={GLOBAL_MAX}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            formatNumber={formatNumber}
          />
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
