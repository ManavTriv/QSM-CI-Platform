import { memo, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useProcessedData from "../../hooks/useProcessedData";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableSearch from "./TableSearch";

const tableClasses = {
  container: "pb-1 overflow-x-auto",
  table:
    "min-w-full bg-white border border-indigo-100 shadow-md rounded-lg overflow-hidden border-collapse separate",
};

const ResultTable = () => {
  const { data, error, loading } = useProcessedData();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [isSorting, setIsSorting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleMetricClick = (metric) => {
    navigate(`/metric?metric=${metric}`);
  };

  const requestSort = (key) => {
    if (isSorting) return;

    setIsSorting(true);
    let direction = "high-to-low";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "high-to-low") {
        direction = "low-to-high";
      } else if (sortConfig.direction === "low-to-high") {
        direction = null;
        key = null;
      }
    }
    setSortConfig({ key, direction });

    setTimeout(() => setIsSorting(false), 100);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...filteredData];

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA > valueB) {
        return sortConfig.direction === "high-to-low" ? -1 : 1;
      }
      if (valueA < valueB) {
        return sortConfig.direction === "high-to-low" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading results"
        description="Fetching algorithm data..."
      />
    );

  return (
    <div className="space-y-4">
      <TableSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search algorithms by name..."
      />
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden">
          <table className="min-w-full border-collapse">
            <TableHeader
              sortConfig={sortConfig}
              requestSort={requestSort}
              onMetricClick={handleMetricClick}
            />
            <TableBody data={sortedData} navigate={navigate} />
          </table>
          {sortedData.length === 0 && searchTerm && (
            <div className="text-center py-8 px-4">
              <p className="text-stone-600 font-radio">
                No algorithms found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ResultTable);
