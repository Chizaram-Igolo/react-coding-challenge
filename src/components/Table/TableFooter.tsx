import Pagination from "./Pagination";

interface TableFooterProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = (props) => {
  return (
    <div>
      <Pagination onPageChange={props.handlePageChange} {...props} />
    </div>
  );
};

export default TableFooter;
