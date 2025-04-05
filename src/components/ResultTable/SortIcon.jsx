import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const tableClasses = {
  sortIcon: "cursor-pointer hover:text-indigo-600 w-4 flex justify-center",
};

const SortIcon = ({ direction }) => {
  const iconProps = {
    size: 16,
    className: tableClasses.sortIcon,
    "aria-hidden": true,
  };

  if (direction === "asc") return <ChevronUp {...iconProps} />;
  if (direction === "desc") return <ChevronDown {...iconProps} />;
  return <ChevronsUpDown {...iconProps} />;
};

export default SortIcon;
