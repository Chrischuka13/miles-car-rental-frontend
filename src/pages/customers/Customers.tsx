import { Search } from "lucide-react";
import CustomersTable from "./CustomersTable";
import { useQuery } from "@tanstack/react-query";
import { getCustomersApi } from "@/api/admin";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Customers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(initialSearch);

  const [debouncedSearch] = useDebounce(searchInput, 500);

  // 1. Sync state input → URL search params safely
  useEffect(() => {
    setSearchParams((prev) => {
      const currentSearch = prev.get("search") || "";
      
      if (debouncedSearch) {
        prev.set("search", debouncedSearch);
      } else {
        prev.delete("search");
      }

      // ONLY reset to page 1 if the user typed a brand new search term
      if (currentSearch !== debouncedSearch) {
        prev.set("page", "1");
      }

      return prev;
    });
  }, [debouncedSearch, setSearchParams]);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getCustomers", search, page], 
    queryFn: () => {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("search", search);
      params.set("limit", "10"); 
      
      return getCustomersApi(params);
    },
  });

  const customers = data?.body?.users ?? [];
  const pagination = data?.body?.pagination;

  // 2. SAFETY CHECK: If URL page is out-of-bounds (e.g. page=2 but totalPages=1), snap back to page 1
  useEffect(() => {
    if (pagination) {
      const urlPage = Number(page);
      if (urlPage > pagination.totalPages && pagination.totalPages > 0) {
        setSearchParams((prev) => {
          prev.set("page", "1");
          return prev;
        });
      }
    }
  }, [pagination, page, setSearchParams]);

  return (
    <section className="p-6 min-h-screen bg-[#F7F7F7]">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-20 lg:pt-17">
        <div>
          <span className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-light">Customers</h1>

            <p className="bg-white border rounded-full text-xs py-1 px-2">
              {pagination?.totalUsers?.toLocaleString() ?? 0} total
            </p>
          </span>

          <p className="mt-2 text-sm text-gray-500 max-w-md">
            Verifications, lifetime spend and booking history for everyone who rents from you.
          </p>
        </div>

        {/* SEARCH + EXPORT */}
        <div className="flex flex-row items-stretch sm:items-center gap-3 lg:justify-end">
          <div className="flex items-center gap-3 px-3 py-2 bg-white border rounded-full w-full sm:w-[250px]">
            <Search className="text-[#878789] shrink-0" />

            <input
              type="text"
              placeholder="Search by name or email"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full outline-none text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <main className="mt-5">
        <CustomersTable
          customers={customers}
          pagination={pagination}
          isPending={isPending}
          isError={isError}
          error={error}
        />
      </main>
    </section>
  );
}