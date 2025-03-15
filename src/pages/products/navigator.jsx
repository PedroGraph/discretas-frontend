import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Navigator({ currentPage, totalPages, handlePageChange }) {
    return (
        <div className="flex space-x-2 my-4">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white"
          >
           <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(Math.min(5, totalPages)).keys()].map((num) => {
            const pageNumber = num + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1  rounded ${
                  currentPage === pageNumber
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
    );
}