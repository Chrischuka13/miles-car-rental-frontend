import { useMemo } from "react";

interface UsePaginateParams {
  totalPages: number;
  hasMore: boolean;
  currentPage: number;
}

interface UsePaginateReturn {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export default function usePaginate({
  totalPages,
  hasMore,
  currentPage,
}: UsePaginateParams): UsePaginateReturn {
  return useMemo(() => {
    const sanitizedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    return {
      currentPage: sanitizedCurrentPage,
      totalPages: totalPages > 0 ? totalPages : 1,
      hasMore: hasMore && sanitizedCurrentPage < totalPages,
    };
  }, [totalPages, hasMore, currentPage]);
}