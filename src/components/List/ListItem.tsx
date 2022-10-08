import { IData } from "data/types";

interface ListProps {
  item: IData;
}

const ListItem: React.FC<ListProps> = ({ item }) => {
  return (
    <li>
      {item.id} |{item.talentName} | {item.talentGrade} | {item.jobManagerName}{" "}
      |{item.totalHours} |{item.industry} {item.clientName}
    </li>
  );
};

export default ListItem;
