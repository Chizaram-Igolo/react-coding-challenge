import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  pageSizeInput: number;
  currentPage: number;
  onPageChange(page: number): void;
  onPageSizeInputChange(newPageSize: number): void;
  onSaveNewPageSize(
    evt: React.FormEvent<HTMLFormElement>,
    newPageSize: number
  ): void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  pageSizeInput,
  currentPage,
  onPageChange,
  onPageSizeInputChange,
  onSaveNewPageSize,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages: number[] = [];

  const lastItemNum = (currentPage - 1) * pageSize + pageSize;

  for (let i = 0; i < pagesCount; i++) pages[i] = i + 1;

  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 
               bg-white px-4 py-3 sm:px-6"
    >
      <div
        className="hidden sm:flex sm:flex-1 sm:items-center 
                   sm:justify-between"
      >
        <div>
          <div className="flex items-center mt-1">
            <p
              className="pr-3 text-sm text-gray-700 border-r border-dashed 
                          border-[#bbb]"
            >
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {lastItemNum < itemsCount ? lastItemNum : itemsCount}
              </span>{" "}
              of <span className="font-medium">{itemsCount}</span> results
            </p>

            <form
              className="ml-3"
              onSubmit={(evt: React.FormEvent<HTMLFormElement>) =>
                onSaveNewPageSize(evt, pageSizeInput)
              }
            >
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700">Show</p>
                <p>
                  <input
                    type="number"
                    className="h-8 w-22 bg-gray-50 border border-gray-300 
                         text-gray-900 text-sm rounded-lg focus:ring-blue-300 
                            focus:border-blue-500 block p-2.5"
                    min="0"
                    max="1000"
                    value={pageSizeInput}
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                      onPageSizeInputChange(parseInt(evt.target.value))
                    }
                  />
                </p>

                <p className="text-sm text-gray-700">per page</p>
                <button
                  type="submit"
                  className="h-8 w-24 text-white bg-blue-600 
                           hover:bg-blue-700 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-md text-sm 
                           sm:w-auto px-5 py-[7px] text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
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
            </button>
            {pages.map((page) =>
              page <= 3 ? (
                <button
                  type="button"
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
                </button>
              ) : null
            )}
            {pages.length > 3 && (
              <span
                className="relative inline-flex items-center border 
                       border-gray-300 bg-white px-4 py-2 text-sm 
                        font-medium text-gray-700"
              >
                ...
              </span>
            )}
            {pages.length > 3 &&
              pages.slice(pages.length - 3).map((page) => (
                <button
                  type="button"
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
                </button>
              ))}
            <button
              type="button"
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
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
