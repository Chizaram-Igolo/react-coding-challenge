import { useState } from "react";

import List from "components/List/List";
import { IData } from "data/types";
import TableFooter from "./TableFooter";
import { paginate } from "../../utils/paginate";

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
      <h1 className="text-3xl font-bold underline uppercase text-red-800">
        Hello world!
      </h1>
      <List data={paginatedData} />
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
