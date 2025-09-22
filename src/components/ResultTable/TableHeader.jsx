import { memo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { createTableHeaders } from "../../config/metrics";

const SortIcon = ({ direction }) => {
  const iconProps = {
    size: 16,
    className: "cursor-pointer hover:text-indigo-400 w-4 flex justify-center",
  };

  if (direction === "high-to-low") return <ChevronDown {...iconProps} />;
  if (direction === "low-to-high") return <ChevronUp {...iconProps} />;
  return <ChevronsUpDown {...iconProps} />;
};

const tableClasses = {
  thead: "bg-indigo-50",
  th: "font-radio px-3 sm:px-6 py-3 border-b border-indigo-200 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-800",
  sortableHeader: "flex items-center gap-1 sm:gap-2",
  headerText: "hover:text-indigo-400 cursor-pointer",
  nonSortableHeader: "",
};

const TableHeader = memo(({ sortConfig, requestSort, onMetricClick }) => {
  const headers = createTableHeaders();

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
