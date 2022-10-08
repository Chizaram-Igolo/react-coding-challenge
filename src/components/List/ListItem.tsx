import { IData } from "data/types";

interface ListProps {
  item: IData;
}

const ListItem: React.FC<ListProps> = ({ item }) => {
  return (
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
        <div>
          <div className="text-base font-semibold">{item.clientName}</div>
          <div className="font-normal text-gray-500">
            Managed by: {item.jobManagerName}
          </div>
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
        {item.bookingGrade ? <>{item.bookingGrade}</> : "n/a"}
      </td>
      <td className="py-4 px-6">
        {item.talentName ? (
          <>{item.talentName}</>
        ) : (
          <div className="text-center">-</div>
        )}
      </td>
      <td scope="row" className="py-4 px-6 text-gray-900 whitespace-nowrap">
        <div>
          <div>{item.officeCity}</div>
          <div className="font-normal text-gray-500">
            Postal Code: {item.officePostalCode}
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        {(item.requiredSkills || []).map((skill, idx) =>
          idx === (item.requiredSkills || []).length - 1 ? (
            <span>{skill.name}</span>
          ) : (
            <span>{skill.name}, </span>
          )
        )}
        {item.requiredSkills?.length === 0 && <>n/a</>}
      </td>
      <td
        scope="row"
        className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap"
      >
        <div>
          <div className="">{item.startDate}</div>
          <div className="">{item.endDate}</div>
          <div className="font-normal text-gray-500 mt-1">
            Total Hours: {item.totalHours} hrs
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
