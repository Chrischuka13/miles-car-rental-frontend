import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  handlePageChange: (action: "first" | "prev" | "next" | "last") => void;
  totalItem?: number;
}

export default function Paginate({
  currentPage,
  totalPages,
  hasMore,
  handlePageChange,
}: PaginateProps) {
  return (
    <div className="flex justify-center md:justify-between items-center py-4">
      <p className="hidden md:block text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center border border-slate-200 rounded-lg">
        <button
          className={`join-item btn ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange("first")}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          className={`join-item px-5 p-2 btn ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          Prev
        </button>
        <button className="join-item p-2 btn h-full bg-indigo-600 text-white pointer-events-none px-5">
          {currentPage}
        </button>
        <button
          className={`join-item btn px-5 p-2 ${!hasMore ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!hasMore}
          onClick={() => handlePageChange("next")}
        >
          Next
        </button>
        <button
          className={`join-item btn ${!hasMore ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!hasMore}
          onClick={() => handlePageChange("last")}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}