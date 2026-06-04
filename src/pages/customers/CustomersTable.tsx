import { useSearchParams } from "react-router";
import {
  adminCustomersColumn,
  type CustomerRecord,
} from "@/lib/constant";
import TableView from "@/components/TableBody";
import { useCallback, type ComponentProps } from "react";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";

interface Pagination {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CustomersTableProps {
  customers: CustomerRecord[];
  pagination?: Pagination;
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

export default function CustomersTable({
  customers,
  pagination,
  isPending,
  isError,
  error,
}: CustomersTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = Number(searchParams.get("page")) || 1;

  const { totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasNextPage || false,
    currentPage: urlPage,
  });

  const handleNavigation = useCallback(
    (action: "first" | "prev" | "next" | "last") => {
      setSearchParams((prev) => {
        let targetPage = urlPage;

        if (action === "first") targetPage = 1;
        else if (action === "prev") targetPage = Math.max(1, urlPage - 1);
        else if (action === "next") targetPage = hasMore ? urlPage + 1 : urlPage;
        else if (action === "last") targetPage = totalPages;

        prev.set("page", String(targetPage));
        return prev;
      });
    },
    [urlPage, hasMore, totalPages, setSearchParams]
  );

  const renderCell = useCallback(
    (customer: CustomerRecord, columnKey: string) => {
      const value = customer[columnKey as keyof CustomerRecord];

      switch (columnKey) {
        case "customer":
          return (
            <div className="flex flex-col">
              <p className="text-sm font-medium">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-xs text-gray-400">{customer._id}</p>
            </div>
          );

        case "email":
          return <p className="text-sm">{customer.email}</p>;

        case "phone":
          return <p className="text-sm">{customer.phone}</p>;

        case "bookingsCount":
          return <p className="text-sm font-medium">{customer.bookingsCount}</p>;

        case "lifetimeSpend":
          return (
            <p className="text-sm font-medium">
              ₦{customer.lifetimeSpend.toLocaleString()}
            </p>
          );

        case "lastBookingDate":
          return (
            <p className="text-sm">
              {customer.lastBookingDate
                ? new Date(customer.lastBookingDate).toLocaleDateString(
                    "en-NG",
                    { month: "short", day: "numeric" }
                  )
                : "—"}
            </p>
          );

        default:
          return <span className="text-sm">{String(value ?? "")}</span>;
      }
    },
    []
  ) as ComponentProps<typeof TableView>["renderCell"];

  return (
    <div className="flex flex-col min-h-[67vh]">
      {isPending ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading customers...</p>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center text-red-500 text-sm">
          {error instanceof Error ? error.message : "Failed to load customers"}
        </div>
      ) : (
        <>
          <div className="flex-1">
            <TableView
              tableColumns={adminCustomersColumn}
              tableData={customers}
              renderCell={renderCell}
            />
          </div>

          <div className="mt-auto">
            <Paginate
              totalPages={totalPages}
              hasMore={hasMore}
              handlePageChange={handleNavigation}
              currentPage={currentPage}
              totalItem={pagination?.totalUsers}
            />
          </div>
        </>
      )}
    </div>
  );
}