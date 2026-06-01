import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "./ui/table";

type TableColumn = {
  uid: string;
  name: string;
};

type TableItem = {
  _id: string | number;
  [key: string]: unknown;
};

type TableBodyProps = {
  tableColumns: TableColumn[];
  tableData: TableItem[];
  renderCell?: (item: TableItem, columnKey: React.Key) => React.ReactNode;
};

export default function TableView({
  tableColumns,
  tableData,
  renderCell,
}: TableBodyProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="table">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>#</TableHead>
            {tableColumns.map((item) => (
              <TableHead className="text-md" key={item.uid}>
                {item.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 border-gray-300 bg-[#FFFFFF]"
            >
              <TableCell>{index + 1}</TableCell>
              {tableColumns.map((col) => (
                <TableCell key={col.uid}>
                  {renderCell ? renderCell(item, col.uid) : ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}