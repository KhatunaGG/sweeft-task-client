// import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
// import React from "react";

// export type PaginationPropsType = {
//   currentPage: number;
//   onPageChange: (page: number) => void;
//   // totalFilesCount: number;
//   take: number;
//   totalPages: number;
//   onItemsPerPage: (take: number) => void;
// };

// const Pagination = ({
//   currentPage,
//   onPageChange,
//   // totalFilesCount,
//   // take,
//   totalPages,
// }: // onItemsPerPage
// PaginationPropsType) => {
//   // console.log(totalFilesCount, "totalFilesCount")
//   // console.log(totalPages, "totalPages")

//   return (
//     <div className="w-full flex items-center justify-between px-6 pb-4 absolute bottom-0 left-0 right-0">
//       <button
//         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//         className="p-4 flex items-center justify-center cursor-pointer"
//       >
//         <SquareArrowLeft className="w-6 h-6" />
//       </button>

//       <div>
//         <button className="w-8 h-8 rounded-lg bg-[#3A5B22] flex items-center justify-center text-white">
//           {currentPage}
//         </button>
//       </div>

//       <button
//         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//         disabled={currentPage === totalPages}
//         className="p-4 flex items-center justify-center cursor-pointer"
//       >
//         <SquareArrowRight className="w-6 h-6" />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import React from "react";


export type PaginationPropsType = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationPropsType) => {


  const getPaginationButtons = () => {
    if (totalPages <= 3) {
      // If total pages are 3 or less, show all pages
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      // If totalPages is greater than 3, show first page, ellipsis, and current page
      return [1, "...", currentPage];
    }
  };

  // Get the pagination buttons to display
  const paginationButtons = getPaginationButtons();

  return (
    <div className="w-full flex items-center justify-between px-6 pb-4 absolute bottom-0 left-0 right-0">
      {totalPages > 0 && (
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-4 flex items-center justify-center cursor-pointer"
        >
          <SquareArrowLeft className="w-6 h-6" />
        </button>
      )}

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">
        {paginationButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => {
              if (button !== "...") {
                onPageChange(button as number);
              }
            }}
            className={`w-8 h-8 rounded-lg ${
              button === currentPage
                ? "bg-[#3A5B22] text-white"
                : " bg-[#b7c0b1] text-white"
            } flex items-center justify-center cursor-pointer`}
            disabled={button === "..."}
          >
            {button === "..." ? "..." : button}
          </button>
        ))}
      </div>

      {totalPages > 0 && (
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-4 flex items-center justify-center cursor-pointer"
        >
          <SquareArrowRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
