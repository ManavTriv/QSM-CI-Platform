import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProcessedData from "../../hooks/useProcessedData";
import ErrorMessage from "../ErrorMessage";
import LoadingMessage from "../LoadingMessage";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const tableClasses = {
  container: "px-2 mx-4 pb-1 overflow-x-auto",
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

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return [...data];

    return [...data].sort((a, b) => {
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
  }, [data, sortConfig]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;

  return (
    <div className={tableClasses.container}>
      <table className={tableClasses.table}>
        <TableHeader
          sortConfig={sortConfig}
          requestSort={requestSort}
          onMetricClick={handleMetricClick}
        />
        <TableBody data={sortedData} navigate={navigate} />
      </table>
    </div>
  );
};

export default memo(ResultTable);
