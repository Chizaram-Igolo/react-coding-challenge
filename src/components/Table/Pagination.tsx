import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages: number[] = [];

  for (let i = 0; i < pagesCount; i++) pages[i] = i + 1;

  if (pagesCount === 1) return null;

  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 
               bg-white px-4 py-3 sm:px-6"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          className="relative inline-flex items-center rounded-md border 
                   border-gray-300 bg-white px-4 py-2 text-sm font-medium 
                   text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          className="relative ml-3 inline-flex items-center rounded-md border 
                   border-gray-300 bg-white px-4 py-2 text-sm font-medium 
                   text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div
        className="hidden sm:flex sm:flex-1 sm:items-center 
                   sm:justify-between"
      >
        <div>
          <div className="flex">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {(currentPage - 1) * pageSize + pageSize}
              </span>{" "}
              of <span className="font-medium">{pagesCount * pageSize}</span>{" "}
              results
            </p>
            <form>
              <input type="number" />
            </form>
          </div>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              className="relative inline-flex items-center rounded-l-md 
                         border border-gray-300 bg-white px-2 py-2 text-sm 
                         font-medium text-gray-500 hover:bg-gray-50 
                         focus:z-20 cursor-pointer"
              onClick={() =>
                onPageChange(currentPage === 1 ? 1 : currentPage - 1)
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pages.map((page) =>
              page <= 3 ? (
                <a
                  className={`relative inline-flex items-center border px-4 
                              py-2 text-sm font-medium hover:bg-gray-50 
                              focus:z-20 cursor-pointer ${
                                page === currentPage
                                  ? "z-10 border-indigo-500 bg-indigo-50 " +
                                    "text-indigo-600"
                                  : "border-gray-300 bg-white text-gray-500"
                              }`}
                  key={page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              ) : null
            )}
            <span
              className="relative inline-flex items-center border 
                       border-gray-300 bg-white px-4 py-2 text-sm 
                        font-medium text-gray-700"
            >
              ...
            </span>
            {pages.slice(pages.length - 3).map((page) => (
              <a
                className={`relative inline-flex items-center border px-4 
                              py-2 text-sm font-medium hover:bg-gray-50 
                              focus:z-20 cursor-pointer ${
                                page === currentPage
                                  ? "z-10 border-indigo-500 bg-indigo-50 " +
                                    "text-indigo-600"
                                  : "border-gray-300 bg-white text-gray-500"
                              }`}
                key={page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            ))}
            <a
              className="relative inline-flex items-center rounded-r-md 
                         border border-gray-300 bg-white px-2 py-2 text-sm 
                         font-medium text-gray-500 hover:bg-gray-50 
                         focus:z-20 cursor-pointer"
              onClick={() =>
                onPageChange(
                  currentPage === pages[pages.length - 1]
                    ? pages[pages.length - 1]
                    : currentPage + 1
                )
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
