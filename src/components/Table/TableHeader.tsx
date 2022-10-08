interface ItableHeading {
  id: number;
  name: string;
  dataName: string;
}

interface TableHeaderProps {
  tableHeadings: ItableHeading[];
  handleSort: (dataName: keyof ItableHeading) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeadings,
  handleSort,
}) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {tableHeadings.map((th) =>
          th.dataName === "id" ||
          th.dataName === "originalId" ||
          th.dataName === "skills" ||
          th.dataName === "timeDuration" ? (
            <th scope="col" className="py-3 px-4" key={th.dataName}>
              {th.name}
            </th>
          ) : (
            <th
              scope="col"
              className="py-3 px-4 cursor-pointer"
              key={th.dataName}
              onClick={() => handleSort(th.dataName as keyof typeof th)}
            >
              <div className="flex items-center">
                <span>{th.name}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2 -mt-[2px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
