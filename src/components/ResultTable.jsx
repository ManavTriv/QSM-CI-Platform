import React, { memo } from "react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

//
// TODO: TABLE SORTING
//

//
// TODO: There are two LAPLACIAN VSHARP RTS
//

const tableClasses = {
  container: "p-2 mx-4",
  table: "min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden",
  thead: "bg-gray-100",
  th: "px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold uppercase tracking-wider text-stone-800",
  tbody: "divide-y divide-gray-200",
  tr: "hover:bg-gray-50 transition-colors",
  td: "px-6 py-4 text-sm text-stone-800",
};

const TableHeader = memo(() => (
  <thead className={tableClasses.thead}>
    <tr>
      {[
        "ALGORITHM",
        "ELO",
        "RMSE",
        "NRMSE",
        "HFEN",
        "MAD",
        "XSIM",
        "CC1",
        "CC2",
        "NMI",
        "GXE",
      ].map((header) => (
        <th key={header} className={tableClasses.th}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
));

const TableBody = memo(({ data }) => (
  <tbody className={tableClasses.tbody}>
    {data.map((entry) => (
      <tr key={entry.id} className={tableClasses.tr}>
        <td className={tableClasses.td}>{entry.name}</td>
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

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;

  return (
    <div className={tableClasses.container}>
      <table className={tableClasses.table}>
        <TableHeader />
        <TableBody data={data} />
      </table>
    </div>
  );
};

export default memo(ResultTable);
