const ScatterPlotLegend = ({ groups }) => {
  if (groups.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-6 justify-center py-4 px-6 bg-gray-50 rounded-lg border border-gray-200">
      {groups.map((group, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: group.color }}
          />
          <span className="text-sm font-medium text-gray-700 font-radio">
            {group.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScatterPlotLegend;
