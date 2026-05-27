interface PaginationProps {
  pagination?: {
    totalPages: number;
    currentPage: number;
    pageSize?: number;
    total?: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  setPage: (page: number) => void;
}

export default function Pagination({ pagination, setPage }: PaginationProps) {
  const currentPage = pagination?.currentPage || 1;

  return (
    <section className="w-full container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-5 lg:py-2">
      {/* Entries */}
      <div className="flex items-center gap-2 text-[#878789] text-sm md:text-base">
        <span>{pagination?.pageSize || 10}</span> Entries per page
      </div>

      {/* Page info */}
      <div className="flex items-center gap-2 text-[#878789] text-sm md:text-base">
        Page {currentPage} of {pagination?.totalPages || 1}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
        <button
          disabled={!pagination?.hasPrevPage}
          onClick={() => setPage(currentPage - 1)}
          className={`flex items-center justify-center gap-2 py-2 px-3 md:px-5 border flex-1 md:flex-none ${
            pagination?.hasPrevPage
              ? "text-[#878789] border-[#878789] cursor-pointer"
              : "text-gray-300 border-gray-200 cursor-not-allowed"
          }`}
        >
          <img src="/Path 94.svg" alt="prev" />
          <span>Previous</span>
        </button>

        <button
          disabled={!pagination?.hasNextPage}
          onClick={() => setPage(currentPage + 1)}
          className={`flex items-center justify-center gap-2 py-2 px-3 md:px-5 border flex-1 md:flex-none ${
            pagination?.hasNextPage
              ? "text-[#878789] border-[#878789] cursor-pointer"
              : "text-gray-300 border-gray-200 cursor-not-allowed"
          }`}
        >
          <span>Next</span>
          <img src="/Path 93.svg" alt="next" />
        </button>
      </div>
    </section>
  );
}
