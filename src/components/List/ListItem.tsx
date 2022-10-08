import { IData } from "data/types";

interface ListProps {
  item: IData;
}

const ListItem: React.FC<ListProps> = ({ item }) => {
  return (
    // <li>
    //   {item.id} |{item.talentName} | {item.talentGrade} | {item.jobManagerName}{" "}
    //   |{item.totalHours} |{item.industry} {item.clientName}
    // </li>

    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap"
      >
        {/* <img
          className="w-10 h-10 rounded-full"
          src="/docs/images/people/profile-picture-1.jpg"
          alt="Jese image"
        /> */}
        <div className="pl-3">
          <div className="text-base font-semibold">{item.clientName}</div>
          <div className="font-normal text-gray-500">{item.jobManagerName}</div>
        </div>
      </th>
      <td className="py-4 px-6">{item.industry}</td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          {item.isUnassigned ? (
            <>
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
              Unassigned
            </>
          ) : (
            <>
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
              Assigned
            </>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        {item.talentName ? (
          <>{item.talentName}</>
        ) : (
          <div className="text-center">-</div>
        )}
      </td>
      <td className="py-4 px-6">{item.startDate}</td>
      <td className="py-4 px-6">{item.endDate}</td>
    </tr>
  );
};

export default ListItem;
