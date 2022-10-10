import { IData } from "data/types";
import { formatAMPM } from "utils/formatDateTime";

interface ListProps {
  item: IData;
}

const ListItem: React.FC<ListProps> = ({ item }) => {
  const assignedStatusElem = (
    <>
      <div
        className={`h-2.5 w-2.5 rounded-full ${
          item.isUnassigned ? "bg-red-500" : "bg-green-400"
        }  mr-2`}
      ></div>
      {item.isUnassigned ? "Unassigned" : "Assigned"}
    </>
  );

  let talentGradeBadgeClassNames = "";

  if (item.talentGrade && item.talentGrade.includes("Lead Associate")) {
    talentGradeBadgeClassNames = "bg-orange-200 text-orange-800";
  } else if (
    item.talentGrade &&
    item.talentGrade.includes("Senior Associate")
  ) {
    talentGradeBadgeClassNames = "bg-yellow-200 text-yellow-800";
  } else if (item.talentGrade && item.talentGrade.includes("Associate")) {
    talentGradeBadgeClassNames = "bg-pink-300 text-pink-800";
  } else if (item.talentGrade && item.talentGrade.includes("Senior Manager")) {
    talentGradeBadgeClassNames = "bg-purple-200 text-purple-800 ";
  } else if (item.talentGrade && item.talentGrade.includes("Manager")) {
    talentGradeBadgeClassNames = "bg-blue-200 text-blue-800 ";
  } else {
    talentGradeBadgeClassNames = "bg-green-200 text-green-800 ";
  }

  const startDate =
    new Date(item.startDate).toDateString() +
    ", " +
    formatAMPM(new Date(item.startDate));
  const endDate =
    new Date(item.endDate).toDateString() +
    ", " +
    formatAMPM(new Date(item.endDate));

  return (
    <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer">
      <td className="py-4 pl-6 pr-2">{item.id}</td>

      <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
        <div>
          <div>{item.originalId}</div>
          <div className="font-normal text-gray-700 flex items-center mt-1">
            {assignedStatusElem}
          </div>
        </div>
      </td>

      <th
        scope="row"
        className="flex items-center py-4 px-4 text-gray-900 whitespace-nowrap"
      >
        <div>
          <div className="text-base font-FiraSans_SemiBold">
            {item.clientName}
          </div>
          <div className="flex items-center font-normal text-gray-500">
            <div>
              Managed by:{" "}
              <span className="text-gray-900">{item.jobManagerName}</span>
            </div>

            <div className="flex -space-x-4 ml-4">
              <div className="w-8 h-8 pt-1 text-center text-white rounded-full border-2 border-white bg-slate-600 hover:bg-gray-600">
                {item.jobManagerName?.slice(0, 2)}
              </div>

              {item.talentName && (
                <div
                  className={`w-8 h-8 pt-1 text-center text-white rounded-full border-2 border-white ${talentGradeBadgeClassNames}`}
                >
                  {item.talentName?.slice(0, 2)}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center font-normal">
            <div className="font-normal text-gray-500">
              Talent:{" "}
              <span className="text-gray-900">
                {item.talentName ? item.talentName : "—"}
              </span>
            </div>
          </div>
          {item.talentName && (
            <div className="mt-1 pl-12 font-normal text-xs text-gray-700">
              <span
                className={`${talentGradeBadgeClassNames} text-sm font-FiraSans_Medium 
                              mr-2 px-2.5 py-0.5 rounded 
                          `}
              >
                {item.talentGrade}
              </span>
            </div>
          )}
        </div>
      </th>
      <td className="py-4 px-4 text-gray-900">{item.industry}</td>

      <td className="py-4 px-4 ">
        {item.bookingGrade ? (
          <span className="text-gray-900">{item.bookingGrade}</span>
        ) : (
          "n/a"
        )}
      </td>

      <td className="py-4 px-4 text-gray-900">{item.operatingUnit}</td>

      <td className="py-4 px-4 text-gray-900 whitespace-nowrap">
        <div>
          <div>{item.officeCity}</div>
          <div className="mt-1 font-normal text-xs text-gray-700">
            Postal Code: {item.officePostalCode}
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        {" "}
        <div>
          {(item.requiredSkills || []).map((skill, idx) =>
            idx === (item.requiredSkills || []).length - 1 ? (
              <span key={skill.name} className="text-gray-900">
                {skill.name}
              </span>
            ) : (
              <span key={skill.name} className="text-gray-900">
                {skill.name},{" "}
              </span>
            )
          )}
          {item.requiredSkills?.length === 0 && <>n/a</>}
        </div>
        <div className="font-normal text-xs text-gray-500 mt-2">
          Optional:{" "}
          {(item.optionalSkills || []).map((skill, idx) =>
            idx === (item.optionalSkills || []).length - 1 ? (
              <span key={skill.name} className="text-gray-500">
                {skill.name}
              </span>
            ) : (
              <span key={skill.name} className="text-gray-500">
                {skill.name},{" "}
              </span>
            )
          )}
          {item.optionalSkills?.length === 0 && <>n/a</>}
        </div>
      </td>

      <td className="flex items-center py-4 px-4 text-gray-900 whitespace-nowrap">
        <div>
          <div className="">{startDate}</div>
          <div className="">{endDate}</div>
          <div className="font-normal text-sm text-gray-700 mt-1">
            Total Hours:{" "}
            <span className="font-FiraSans_SemiBold text-gray-800">
              {item.totalHours} hrs
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
