import List from "components/List/List";
import { IData } from "data/types";

interface TableProps {
  data: IData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  console.log(data);
  return <List data={data} />;
};

export default Table;
