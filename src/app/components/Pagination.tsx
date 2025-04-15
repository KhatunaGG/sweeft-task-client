import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import React from "react";
import { PaginationPropsType } from "../interface";

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
  isLoading = false,
}: PaginationPropsType) => {
  const getPageNumbers = () => {
    if (isNaN(totalPages) || totalPages <= 0) {
      return [];
    }
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, validCurrentPage - 1);
      let endPage = Math.min(validCurrentPage + 1, totalPages - 1);
      if (validCurrentPage <= 2) {
        endPage = Math.min(4, totalPages - 1);
      } else if (validCurrentPage >= totalPages - 1) {
        startPage = Math.max(totalPages - 3, 2);
      }
      if (startPage > 2) {
        pageNumbers.push("...");
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };
  if (isNaN(totalPages) || totalPages <= 0) return null;
  const paginationButtons = getPageNumbers();

  return (
    <div className="w-full flex items-center justify-between px-6 pb-4 absolute bottom-0 left-0 right-0">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1 || isLoading}
        className="p-4 flex items-center justify-center cursor-pointer"
        aria-label="Previous page"
      >
        <SquareArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex items-center space-x-2">
        {paginationButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => {
              if (button !== "..." && !isLoading) {
                onPageChange(button as number);
              }
            }}
            disabled={button === "..." || isLoading}
            className={`w-8 h-8 rounded-lg ${
              button === currentPage
                ? "bg-[#3A5B22] text-white"
                : "bg-[#b7c0b1] text-white"
            } flex items-center justify-center cursor-pointer`}
            aria-label={button === "..." ? "More pages" : `Page ${button}`}
          >
            {String(button)}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages || isLoading}
        className="p-4 flex items-center justify-center cursor-pointer"
        aria-label="Next page"
      >
        <SquareArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
