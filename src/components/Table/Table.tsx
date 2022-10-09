import { useEffect, useState } from "react";

import List from "components/List/List";
import { IData } from "data/types";
import { paginate } from "../../utils/paginate";
import TableHeader from "./TableHeader";

import Pagination from "./Pagination";
import SubsetFilterComboBox from "./SubsetFilterComboBox";
import { subsets, tableHeadings } from "data/categories";
import ValueFilterComboBox from "./ValueFilterComboBox";

interface TableProps {
  data: IData[];
}

interface ISubset {
  id: number;
  name: string;
  dataName: string;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState<IData[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<IData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);

  const [currentFilterSubset, setCurrentFilterSubset] = useState<ISubset>(
    subsets[0]
  );

  const [filterValues, setFilterValues] = useState<string[]>([]);
  const [currentFilterValue, setCurrentFilterValue] = useState("");

  // Pagination effect

  useEffect(() => {
    let dataSrc: IData[] = [];

    // Considering filtered values first if available.
    if (filteredData.length > 0) dataSrc = [...filteredData];
    else dataSrc = [...data];

    const paginatedData = paginate(dataSrc, currentPage, pageSize);
    setSortedAndFilteredData(paginatedData);
  }, [data, currentPage, pageSize, filteredData]);

  // Filtering effects

  useEffect(() => {
    const currValues = [
      // @ts-ignore
      ...new Set(data.map((item) => item[currentFilterSubset.dataName])),
    ];

    currValues.splice(currValues.indexOf(""), 1);

    setFilterValues(currValues);
    setCurrentFilterValue("");
  }, [currentFilterSubset]);

  // useEffect(() => {
  //   if (filteredData.length > 0) {
  //     const paginatedData = paginate(
  //       sortedAndFilteredData,
  //       currentPage,
  //       pageSize
  //     );

  //     setSortedAndFilteredData(paginatedData);
  //   }
  // }, [filteredData]);

  // Pagination

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeInputChange = (newPageSize: number) => {
    setPageSizeInput(newPageSize);
  };

  const handleSaveNewPageSize = (
    evt: React.FormEvent<HTMLFormElement>,
    newPageSize: number
  ) => {
    evt.preventDefault();
    if (isNaN(newPageSize)) return;

    if (newPageSize > 1000) setPageSize(1000);
    else setPageSize(newPageSize);
  };

  // Sorting

  const handleSort = (headingName: string) => {
    let sortedData = [...sortedAndFilteredData].sort((a, b) => {
      // For string comparison
      if (typeof a[headingName as keyof IData] === "string") {
        // @ts-ignore
        return a[headingName].localeCompare(b[headingName], "en", {
          numeric: true,
        });
      } else if (typeof a[headingName as keyof IData] === "number") {
        // For numeric/number of hours comparison
        // @ts-ignore
        return a[headingName] > b[headingName]
          ? 1
          : // @ts-ignore
          a[headingName] < b[headingName]
          ? -1
          : 0;
      }
    });

    setSortedAndFilteredData(sortedData);
  };

  // Filtering

  const handleChangeFilterSubset = (newSubset: ISubset) => {
    setCurrentFilterSubset(newSubset);
    setCurrentFilterValue("");
  };

  const handleChangeFilterValue = (newValue: string) => {
    setCurrentFilterValue(newValue);
  };

  const handleFilterByValue = (
    evt: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    evt.preventDefault();

    if (!value || value === undefined) return;

    console.log("dd");
    let _filteredItems = [...data].filter(
      // @ts-ignore
      (item) => item[currentFilterSubset.dataName] === value
    );

    setFilteredData(_filteredItems);
    console.log(_filteredItems);
  };

  const handleClearFilterValues = () => {
    setFilterValues([]);
    setFilteredData([]);
  };

  if (data.length === 0) return <p>There are no items to display.</p>;

  return (
    <div className="min-w-full">
      <div className="min-w-[80rem] flex my-4">
        <div className="flex pt-2 px-4 space-x-3 text-sm text-gray-700">
          <h2 className="text-2xl font-bold">
            <i>daash</i>
          </h2>
          {true ? (
            <button
              type="submit"
              className="flex h-8 w-44 lg:w-auto text-white bg-blue-600 
                           hover:bg-blue-700 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-md text-sm 
                            px-5 py-[7px] text-center"
            >
              Go to Overview{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="-mt-[2px] ml-2 w-5 h-5"
              >
                <path d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
                <path d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex h-8 w-48 lg:w-40 text-white bg-blue-600 
                           hover:bg-blue-700 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-md text-sm 
                            px-5 py-[7px] text-center"
            >
              Go to Table
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="-mt-[2px] ml-2 w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        <form
          className="ml-3 flex items-center"
          onSubmit={(evt: React.FormEvent<HTMLFormElement>) =>
            handleFilterByValue(evt, currentFilterValue)
          }
        >
          <div className="pt-5 px-4 text-sm text-gray-700">Filter by:</div>
          <div>
            <SubsetFilterComboBox
              subsets={subsets}
              currentFilterSubset={currentFilterSubset}
              onChangeFilterSubset={handleChangeFilterSubset}
            />
          </div>
          <div className="pt-5 px-4 text-sm text-gray-700">Type to Search:</div>
          <div>
            <ValueFilterComboBox
              filterValues={filterValues}
              currentFilterValue={currentFilterValue}
              onChangeFilterValue={handleChangeFilterValue}
            />
          </div>

          <div className="mt-1 ml-[4.6rem]">
            <button
              type="submit"
              className="h-[38px] w-24 text-white bg-blue-600 
                           hover:bg-blue-700 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-md text-sm 
                           sm:w-auto px-5 py-2.5 text-center"
            >
              Search
            </button>
          </div>

          <div className="mt-1 ml-2">
            <button
              type="button"
              className="h-[38px] w-24 text-white bg-gray-500 
                           hover:bg-gray-700 focus:ring-4 focus:outline-none 
                           focus:ring-gray-300 font-medium rounded-md text-sm 
                           sm:w-auto px-5 py-2.5 text-center"
              onClick={handleClearFilterValues}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      <Pagination
        itemsCount={filteredData.length > 0 ? filteredData.length : data.length}
        pageSize={pageSize}
        pageSizeInput={pageSizeInput}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeInputChange={handlePageSizeInputChange}
        onSaveNewPageSize={handleSaveNewPageSize}
      />

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeader tableHeadings={tableHeadings} handleSort={handleSort} />
          <List data={sortedAndFilteredData} />
        </table>
      </div>

      <Pagination
        itemsCount={filteredData.length > 0 ? filteredData.length : data.length}
        pageSize={pageSize}
        pageSizeInput={pageSizeInput}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeInputChange={handlePageSizeInputChange}
        onSaveNewPageSize={handleSaveNewPageSize}
      />
    </div>
  );
};

export default Table;
