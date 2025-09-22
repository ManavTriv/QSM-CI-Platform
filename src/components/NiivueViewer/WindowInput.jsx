const WindowInput = ({
  label,
  value,
  step,
  min,
  max,
  onChange,
  onBlur,
  formatNumber,
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-stone-600 mb-1 font-medium">{label}</span>
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : ""}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors duration-200 cursor-text"
        placeholder="0.000"
      />
      <span className="text-[10px] mt-1 text-stone-500 font-medium">
        {formatNumber(value)}
      </span>
    </div>
  );
};

export default WindowInput;
