import * as Slider from "@radix-ui/react-slider";

const WindowSlider = ({
  sliderMin,
  sliderMax,
  step,
  windowMin,
  windowMax,
  onSliderChange,
  onSliderCommit,
}) => {
  return (
    <Slider.Root
      className="relative flex items-center w-full h-6 select-none touch-none"
      min={sliderMin}
      max={sliderMax}
      step={step}
      value={[
        Number.isFinite(windowMin) ? windowMin : sliderMin,
        Number.isFinite(windowMax) ? windowMax : sliderMax,
      ]}
      onValueChange={onSliderChange}
      onValueCommit={onSliderCommit}
    >
      <Slider.Track className="bg-stone-200 relative h-2 rounded-full flex-1">
        <Slider.Range className="absolute h-2 bg-indigo-400 rounded-full" />
      </Slider.Track>
      <Slider.Thumb className="w-5 h-5 bg-white border-2 border-indigo-400 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:scale-110" />
      <Slider.Thumb className="w-5 h-5 bg-white border-2 border-indigo-400 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:scale-110" />
    </Slider.Root>
  );
};

export default WindowSlider;
