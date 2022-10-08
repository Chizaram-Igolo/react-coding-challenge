import { useState } from "react";

import List from "components/List/List";
import { IData } from "data/types";
import TableFooter from "./TableFooter";
import { paginate } from "../../utils/paginate";
import TableHeader from "./TableHeader";

interface TableProps {
  data: IData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (data.length === 0) return <p>There are no items to display.</p>;

  const paginatedData = paginate(data, currentPage, pageSize);

  return (
    <>
      {/* <List data={paginatedData} /> */}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeader />
          <tbody>
            <List data={paginatedData} />
          </tbody>
        </table>
      </div>

      <TableFooter
        itemsCount={10000}
        pageSize={pageSize}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Table;
