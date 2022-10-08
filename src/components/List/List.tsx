import { IData } from "data/types";
import ListItem from "./ListItem";

interface ListProps {
  data: IData[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((item) => (
        <ListItem item={item} key={item.originalId} />
      ))}
    </tbody>
  );
};

export default List;
