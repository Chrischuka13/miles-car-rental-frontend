

interface Column {
  uid: string;
  name: string;
}

interface TableBodyProps {
  tableColumns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCell?: (item: any, columnKey: string) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (item: any) => void;
}

export default function TableBody({
  tableColumns,
  tableData,
  renderCell,
  onRowClick,
}: TableBodyProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide">
            <th className="p-4 w-10">
              <input type="checkbox" className="rounded" />
            </th>
            {tableColumns.map((col) => (
              <th key={col.uid} className="p-4 text-left font-medium">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.length > 0 ? (
            tableData.map((item) => (
              <tr
                key={item._id || item.id}
              
              >
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                {tableColumns.map((col) => (
                  <td key={col.uid}   onClick={() => onRowClick?.(item)}
                className={`p-4 text-gray-600 border-b border-gray-50 hover:bg-gray-50 transition ${onRowClick ? "cursor-pointer" : ""}`}>
                    {renderCell ? renderCell(item, col.uid) : item[col.uid]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableColumns.length + 1}
                className="h-24 text-center text-gray-400 text-sm"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}