import { IData } from "data/types";
import ListItem from "./ListItem";

interface ListProps {
  data: IData[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <ListItem item={item} key={item.originalId} />
      ))}
    </>
  );
};

export default List;
