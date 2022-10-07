import { IData } from "data/types";

interface ListProps {
  item: IData;
}

const ListItem: React.FC<ListProps> = ({ item }) => {
  return <li>{item.talentName}</li>;
};

export default ListItem;
