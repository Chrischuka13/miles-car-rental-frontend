import { type ColumnDef } from "@tanstack/react-table";
import { type Driver } from "@/types/driver";
import DriverStatusBadge from "./DriverStatusBadge";

export const columns: ColumnDef<Driver>[] = [
  { accessorKey: "fullName", header: "Driver" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DriverStatusBadge status={row.original.status} />,
  },
  { accessorKey: "trips", header: "Trips" },
];
