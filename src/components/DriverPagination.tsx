// interface Props {
//   page: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export default function DriverPagination({
//   page,
//   totalPages,
//   onPageChange,
// }: Props) {
//   return (
//     <div className="md:flex items-center justify-between px-4 py-3 text-sm text-gray-500">

//       <button
//         disabled={page === 1}
//         onClick={() => onPageChange(page - 1)}
//         className="rounded-lg border px-4 py-2 disabled:opacity-50"
//       >
//         Previous
//       </button>

//       <div className="flex items-center gap-2">
//         {Array.from(
//           { length: totalPages },
//           (_, i) => i + 1
//         ).map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() =>
//               onPageChange(pageNumber)
//             }
//             className={`h-10 w-10 rounded-lg ${
//               page === pageNumber
//                 ? "bg-orange-500 text-white"
//                 : "border"
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>

//       <button
//         disabled={page === totalPages}
//         onClick={() => onPageChange(page + 1)}
//         className="rounded-lg border px-4 py-2 disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// }


import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  handlePageChange: (direction: "first" | "last" | "prev" | "next") => void;
  totalItem?: number;
}

export default function DriverPagination({
  currentPage,
  totalPages,
  hasMore,
  handlePageChange,
  totalItem,
}: PaginateProps) {
  return (
    <div className="md:flex items-center justify-between px-4 py-3 text-sm text-gray-500">

      {/* left - entries info */}
      <span>
        {totalItem ? `${totalItem} entries` : `Page ${currentPage} of ${totalPages}`}
      </span>

      {/* center - page indicator */}
      <span>Page {currentPage} of {totalPages}</span>

      {/* right - navigation buttons */}
      <div className="flex items-center gap-2">
        {/* first page */}
        <button
          onClick={() => handlePageChange("first")}
          disabled={currentPage === 1}
          className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* prev */}
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        {/* current page */}
        <span className="px-4 py-1.5 bg-[#F97316] text-white rounded-lg text-sm font-medium">
          {currentPage}
        </span>

        {/* next */}
        <button
          onClick={() => handlePageChange("next")}
          disabled={!hasMore}
          className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next
          <ChevronRight size={14} />
        </button>

        {/* last page */}
        <button
          onClick={() => handlePageChange("last")}
          disabled={!hasMore}
          className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}