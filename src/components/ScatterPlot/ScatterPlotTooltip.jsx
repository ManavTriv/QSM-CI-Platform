const ScatterPlotTooltip = ({ active, payload, xAxis, yAxis, groupBy }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-indigo-200 rounded-lg shadow-lg p-3 max-w-xs">
        <div className="font-semibold text-sm mb-2 text-stone-800 font-radio">
          {data.name}
        </div>
        <div className="text-xs space-y-1 font-radio">
          <div className="text-stone-700">
            {xAxis}: <span className="font-medium">{data.x?.toFixed(3)}</span>
          </div>
          <div className="text-stone-700">
            {yAxis}: <span className="font-medium">{data.y?.toFixed(3)}</span>
          </div>
          {groupBy !== "none" && (
            <div className="pt-2 border-t border-indigo-100 text-stone-600">
              {data.groupValue}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default ScatterPlotTooltip;
