import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NeurowelPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const NeurowelPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: NeurowelPaginationProps) => {
  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 3 || i === currentPage || i === totalPages) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
            className={`px-2 rounded ${
              currentPage > 1 ? "shadow-md bg-white rounded-full" : "opacity-50"
            }`}
            aria-disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {getPages().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className={`px-2 rounded ${
              currentPage < totalPages
                ? "shadow-md bg-white rounded-full"
                : "opacity-50"
            }`}
            aria-disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
