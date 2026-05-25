import { useNavigate, useSearchParams } from "react-router";
import { useMemo } from "react";

interface UsePaginateProps {
  totalPages: number;
  hasMore: boolean;
  currentPage: number;
}

export default function usePaginate({ totalPages, hasMore, currentPage }: UsePaginateProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handlePageChange = (direction: "first" | "last" | "prev" | "next") => {
    const pageChange = {
      first: 1,
      last: totalPages,
      prev: Math.max(1, page - 1),
      next: Math.min(totalPages, page + 1),
    };
    const newPage = pageChange[direction];
    if (newPage !== undefined) params.set("page", newPage.toString());
    params.set("limit", limit.toString());
    navigate(window.location.pathname + "?" + params.toString());
  };

  return {
    handlePageChange,
    page,
    limit,
    totalPages,
    hasMore,
    currentPage,
  };
}