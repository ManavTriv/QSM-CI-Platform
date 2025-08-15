import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const tableClasses = {
  sortIcon: "cursor-pointer hover:text-indigo-400 w-4 flex justify-center",
};

const SortIcon = ({ direction }) => {
  const iconProps = {
    size: 16,
    className: tableClasses.sortIcon,
  };

  if (direction === "high-to-low") return <ChevronDown {...iconProps} />;
  if (direction === "low-to-high") return <ChevronUp {...iconProps} />;
  return <ChevronsUpDown {...iconProps} />;
};

export default SortIcon;
