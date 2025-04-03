import React, { memo, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const tableClasses = {
  container: "p-4 md:p-2 mx-2 md:mx-4 overflow-x-auto",
  table:
    "min-w-full bg-white border border-indigo-100 shadow-md rounded-lg overflow-hidden border-collapse separate",
  thead: "bg-indigo-50",
  th: "px-6 py-3 border-b border-indigo-200 text-left text-sm font-semibold uppercase tracking-wider text-stone-800",
  tbody: "divide-y divide-indigo-100",
  tr: "hover:bg-indigo-50 transition-colors duration-75",
  td: "px-6 py-4 text-sm text-stone-800 border-b border-indigo-100",
  sortableHeader: "flex items-center gap-2",
  headerText: "hover:text-indigo-600 cursor-pointer",
  nonSortableHeader: "",
  sortIcon: "cursor-pointer hover:text-indigo-600 w-4 flex justify-center",
};

const SortIcon = ({ direction }) => {
  const iconProps = {
    size: 16,
    className: tableClasses.sortIcon,
    "aria-hidden": true
  };

  if (direction === "asc") return <ChevronUp {...iconProps} />;
  if (direction === "desc") return <ChevronDown {...iconProps} />;
  return <ChevronsUpDown {...iconProps} />;
};

const TableHeader = memo(({ sortConfig, requestSort }) => {
  const headers = [
    { key: "name", label: "ALGORITHM", sortable: false },
    { key: "Elo", label: "ELO", sortable: true },
    { key: "RMSE", label: "RMSE", sortable: true },
    { key: "NRMSE", label: "NRMSE", sortable: true },
    { key: "HFEN", label: "HFEN", sortable: true },
    { key: "MAD", label: "MAD", sortable: true },
    { key: "XSIM", label: "XSIM", sortable: true },
    { key: "CC1", label: "CC1", sortable: true },
    { key: "CC2", label: "CC2", sortable: true },
    { key: "NMI", label: "NMI", sortable: true },
    { key: "GXE", label: "GXE", sortable: true },
  ];

  return (
    <thead className={tableClasses.thead}>
      <tr>
        {headers.map((header) => (
          <th key={header.key} className={tableClasses.th}>
            {header.sortable ? (
              <div className={tableClasses.sortableHeader}>
                <span
                  className={tableClasses.headerText}
                  onClick={() => requestSort(header.key)}
                >
                  {header.label}
                </span>
                <span
                  onClick={() => requestSort(header.key)}
                  aria-label={`Sort by ${header.label}`}
                >
                  <SortIcon
                    direction={
                      sortConfig.key === header.key
                        ? sortConfig.direction
                        : null
                    }
                  />
                </span>
              </div>
            ) : (
              <div className={tableClasses.nonSortableHeader}>
                {header.label}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
});

const TableBody = memo(({ data }) => (
  <tbody className={tableClasses.tbody}>
    {data.map((entry) => (
      <tr key={entry.id} className={tableClasses.tr}>
        <td className={`${tableClasses.td} font-medium`}>{entry.name}</td>
        {[
          "Elo",
          "RMSE",
          "NRMSE",
          "HFEN",
          "MAD",
          "XSIM",
          "CC1",
          "CC2",
          "NMI",
          "GXE",
        ].map((metric) => (
          <td key={metric} className={tableClasses.td}>
            {entry[metric]?.toFixed(3) || "N/A"}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
));

const ResultTable = () => {
  const { data, error, loading } = useProcessedData();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [isSorting, setIsSorting] = useState(false);

  const requestSort = (key) => {
    if (isSorting) return;

    setIsSorting(true);
    let direction = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
        key = null;
      }
    }
    setSortConfig({ key, direction });

    // Small delay to allow the UI to update smoothly
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
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;

  return (
    <div className={tableClasses.container}>
      <table className={tableClasses.table}>
        <TableHeader sortConfig={sortConfig} requestSort={requestSort} />
        <TableBody data={sortedData} />
      </table>
    </div>
  );
};

export default memo(ResultTable);
