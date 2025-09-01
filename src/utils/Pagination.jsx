import React from "react";

function Pagination({ page, handlePaginationPage, lastPage }) {
  const paginationPages = (currentPage, totalPage) => {
    const pages = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage
        );
      }
    }

    return pages;
  };

  const pageNumbers = paginationPages(page, lastPage);

  return (
    <div className="flex justify-center py-4 mt-4">
      <div className="flex gap-1">
        {/* Prev Button */}
        <button
          onClick={() => handlePaginationPage(page - 1)}
          disabled={page === 1}
          className={`${
            page === 1 ? "bg-red-400" : "bg-red-600"
          } text-white font-medium px-5 py-1 rounded-md cursor-pointer`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers?.map((number, i) => (
          <button
            key={i}
            onClick={() =>
              typeof number === "number" && handlePaginationPage(number)
            }
            className={`px-2 py-1 rounded-md ${
              number === page
                ? "bg-red-700 text-white font-bold"
                : "font-medium text-black"
            } ${
              typeof number !== "number"
                ? "pointer-events-none text-gray-400"
                : "cursor-pointer"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={page === lastPage}
          onClick={() => page < lastPage && handlePaginationPage(page + 1)}
          className={`${
            page === lastPage ? "bg-red-400" : "bg-red-600"
          } text-white font-medium px-5 py-1 rounded-md cursor-pointer`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
