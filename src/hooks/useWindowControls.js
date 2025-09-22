const GLOBAL_MIN = -0.2;
const GLOBAL_MAX = 0.2;

const useWindowControls = (
  windowMin,
  setWindowMin,
  windowMax,
  setWindowMax,
  onWindowChange
) => {
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

  const handleMinInputChange = (e) => {
    const raw = parseFloat(e.target.value);
    if (!Number.isFinite(raw)) return;
    setWindowMin(clampMin(raw));
  };

  const handleMaxInputChange = (e) => {
    const raw = parseFloat(e.target.value);
    if (!Number.isFinite(raw)) return;
    setWindowMax(clampMax(raw));
  };

  const handleMinInputBlur = () => setWindowMin((v) => clampMin(Number(v)));
  const handleMaxInputBlur = () => setWindowMax((v) => clampMax(Number(v)));

  return {
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
  };
};

export default useWindowControls;
