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
  }, [currentFilterSubset, data]);

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
        // with numbers being considered
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
      } else {
        // For skill count comparison
        // @ts-ignore
        console.log(headingName);
        // @ts-ignore
        return a[headingName].length > b[headingName].length
          ? -1
          : // @ts-ignore
          a[headingName].length < b[headingName].length
          ? 1
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
    setFilteredData([]);
  };

  if (data.length === 0) return <p>There are no items to display.</p>;

  return (
    <div className="min-w-[80rem]">
      <div className="min-w-80 flex my-4">
        <form
          className="ml-3 flex items-center"
          onSubmit={(evt: React.FormEvent<HTMLFormElement>) =>
            handleFilterByValue(evt, currentFilterValue)
          }
        >
          <div className="pt-5 px-4 text-sm text-gray-700">Filter by:</div>
          <div className="flex items-center">
            <SubsetFilterComboBox
              subsets={subsets}
              currentFilterSubset={currentFilterSubset}
              onChangeFilterSubset={handleChangeFilterSubset}
            />
            <div className="pt-5 px-4 text-sm text-gray-700">
              Type to Search:
            </div>

            <ValueFilterComboBox
              filterValues={filterValues}
              currentFilterValue={currentFilterValue}
              onChangeFilterValue={handleChangeFilterValue}
            />

            <div className="mt-1 ml-[10.6rem]">
              <button
                type="submit"
                className="h-[38px] w-auto text-white bg-blue-600 
                           hover:bg-blue-700 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-FiraSans_Medium rounded-md text-sm 
                           sm:w-auto px-5 py-2.5 text-center"
              >
                Search
              </button>
            </div>

            <div className="mt-1 ml-2">
              <button
                type="button"
                className="h-[38px] w-auto text-white bg-gray-500 
                           hover:bg-gray-700 focus:ring-4 focus:outline-none 
                           focus:ring-gray-300 font-FiraSans_Medium rounded-md text-sm 
                           sm:w-auto px-5 py-2.5 text-center"
                onClick={handleClearFilterValues}
              >
                Clear Filters
              </button>
            </div>
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
