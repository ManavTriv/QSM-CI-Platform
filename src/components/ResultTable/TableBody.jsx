import { memo } from "react";

const tableClasses = {
  tbody: "divide-y divide-indigo-100",
  tr: "hover:bg-indigo-50 transition-colors duration-75",
  td: "font-radio px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-stone-800 border-b border-indigo-100",
};

const TableBody = memo(({ data, navigate }) => (
  <tbody className={tableClasses.tbody}>
    {data.map((entry) => (
      <tr key={entry.id} className={tableClasses.tr}>
        <td className={`${tableClasses.td} font-medium`}>
          <button
            type="button"
            className="hover:text-indigo-400 cursor-pointer text-left underline-offset-2 hover:underline focus:outline-none focus:underline"
            onClick={() =>
              navigate(`/algorithm?name=${encodeURIComponent(entry.name)}`)
            }
            aria-label={`View details for ${entry.name}`}
          >
            {entry.name}
          </button>
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
            {typeof entry[metric] === "number"
              ? entry[metric].toFixed(3)
              : "N/A"}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
));

export default TableBody;
