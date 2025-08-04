import React, { memo } from "react";
import SortIcon from "./SortIcon";

const tableClasses = {
  thead: "bg-indigo-50",
  th: "font-radio px-6 py-3 border-b border-indigo-200 text-left text-sm font-semibold uppercase tracking-wider text-stone-800",
  sortableHeader: "flex items-center gap-2",
  headerText: "hover:text-indigo-400 cursor-pointer",
  nonSortableHeader: "",
};

const TableHeader = memo(({ sortConfig, requestSort, onMetricClick }) => {
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

  const handleMetricNameClick = (header) => {
    if (header.sortable && header.key !== "name") {
      onMetricClick(header.key);
    }
  };

  const handleSortIconClick = (header) => {
    if (header.sortable) {
      requestSort(header.key);
    }
  };

  return (
    <thead className={tableClasses.thead}>
      <tr>
        {headers.map((header) => (
          <th key={header.key} className={tableClasses.th}>
            {header.sortable ? (
              <div className={tableClasses.sortableHeader}>
                <span
                  className={tableClasses.headerText}
                  onClick={() => handleMetricNameClick(header)}
                >
                  {header.label}
                </span>
                <span onClick={() => handleSortIconClick(header)}>
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

export default TableHeader;
