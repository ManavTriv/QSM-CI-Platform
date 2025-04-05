import React, { memo } from "react";

const tableClasses = {
  tbody: "divide-y divide-indigo-100",
  tr: "hover:bg-indigo-50 transition-colors duration-75",
  td: "px-6 py-4 text-sm text-stone-800 border-b border-indigo-100",
};

const TableBody = memo(({ data, navigate }) => (
  <tbody className={tableClasses.tbody}>
    {data.map((entry) => (
      <tr key={entry.id} className={tableClasses.tr}>
        <td className={`${tableClasses.td} font-medium`}>
          <span
            className="hover:text-indigo-600 cursor-pointer"
            onClick={() =>
              navigate(`/algorithm?name=${encodeURIComponent(entry.name)}`)
            }
          >
            {entry.name}
          </span>
        </td>
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

export default TableBody;
