import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({
  sortConfig,
  sortedData,
  onRequestSort,
  onMetricClick,
  navigate,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
      <div className="overflow-x-auto table-scrollbar">
        <table className="border-collapse w-full" style={{ minWidth: "100%" }}>
          <TableHeader
            sortConfig={sortConfig}
            requestSort={onRequestSort}
            onMetricClick={onMetricClick}
          />
          <TableBody data={sortedData} navigate={navigate} />
        </table>
      </div>
    </div>
  );
};

export default Table;
