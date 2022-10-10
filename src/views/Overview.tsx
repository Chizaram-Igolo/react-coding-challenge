import {
  BarChart,
  BarSeries,
  BubbleChart,
  PieChart,
  PieArcSeries,
} from "reaviz";

import data from "data/planning.json";
import { IData } from "data/types";

export default function Overview() {
  const dataSet = [...(data as IData[])];

  const unAssigned = dataSet.filter((item) => item.isUnassigned).length;

  const assigned = dataSet.filter((item) => !item.isUnassigned).length;

  // Industry

  const industriesUnique = [
    ...new Set(dataSet.map((item) => item["industry"])),
  ];
  const industryCountSet: { key: string; data: number }[] = [];

  for (let i = 0; i < industriesUnique.length; i++) {
    let industryCount = dataSet.filter(
      (item) => item["industry"] === industriesUnique[i]
    ).length;

    industryCountSet.push({
      key: industriesUnique[i] as string,
      data: industryCount,
    });
  }

  industryCountSet.sort((a, b) =>
    a.data > b.data ? 1 : a.data < b.data ? -1 : 0
  );

  //   const industryAvg = industryCountSet.reduce((a, b) => a + b.data, 0);

  // Booking Grade

  const bookingGradesUnique = [
    ...new Set(dataSet.map((item) => item["bookingGrade"])),
  ];
  const bookingGradeCountSet: { key: string; data: number }[] = [];

  for (let i = 0; i < bookingGradesUnique.length; i++) {
    let bookingGradeCount = dataSet.filter(
      (item) => item["bookingGrade"] === bookingGradesUnique[i]
    ).length;

    bookingGradeCountSet.push({
      key: bookingGradesUnique[i] as string,
      data: bookingGradeCount,
    });
  }

  // Replace "" with "n/a".
  bookingGradeCountSet[
    bookingGradeCountSet.indexOf(
      bookingGradeCountSet.filter((item) => item.key === "")[0]
    )
  ].key = "n/a";

  const sortedBGCSet = bookingGradeCountSet
    .filter((item) => item.key !== "n/a")
    .sort((a, b) => (a.data > b.data ? 1 : a.data < b.data ? -1 : 0));

  industryCountSet.sort((a, b) =>
    a.data > b.data ? 1 : a.data < b.data ? -1 : 0
  );

  // Operating Unit

  const opUnitUnique = [
    ...new Set(dataSet.map((item) => item["operatingUnit"])),
  ];
  const opUnitCountSet: { key: string; data: number }[] = [];

  for (let i = 0; i < opUnitUnique.length; i++) {
    let opUnitCount = dataSet.filter(
      (item) => item["operatingUnit"] === opUnitUnique[i]
    ).length;

    opUnitCountSet.push({
      key: opUnitUnique[i] as string,
      data: opUnitCount,
    });
  }

  const sortedOPUSet = [...opUnitCountSet].sort((a, b) =>
    a.data > b.data ? 1 : a.data < b.data ? -1 : 0
  );

  opUnitCountSet.sort((a, b) =>
    // @ts-ignore
    a.key.localeCompare(b.key, "en", {
      numeric: true,
    })
  );

  console.log(opUnitCountSet);

  return (
    <>
      <div className="flex items-center justify-center space-x-0">
        <div>
          <PieChart
            height={600}
            width={700}
            data={industryCountSet}
            displayAllLabels={true}
            series={
              <PieArcSeries
                cornerRadius={4}
                padAngle={0.02}
                padRadius={200}
                doughnut={true}
              />
            }
          />

          <div className="w-[240px] mx-auto -mt-8">
            <h3 className="text-center text-lg mb-4">Industry</h3>
            <p className="text-sm text-gray-500">
              largest:{" "}
              <span className="text-gray-900">
                {industryCountSet[industryCountSet.length - 1].data}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              smallest:{" "}
              <span className="text-gray-900">{industryCountSet[0].data}</span>
            </p>
            <p className="text-sm text-gray-500">
              average:{" "}
              <span className="text-gray-900">
                {Math.round(
                  industryCountSet.reduce((a, b) => a + b.data, 0) /
                    industryCountSet.length
                )}
              </span>
            </p>
          </div>

          <div className="w-[500px] mt-8 ml-8">
            <BarChart height={400} width={600} data={opUnitCountSet} />

            <div className="w-[240px] mx-auto mt-4">
              <h3 className="text-center text-lg mb-4">Operating unit</h3>
              <p className="text-sm text-gray-500">
                largest:{" "}
                <span className="text-gray-900">
                  {sortedOPUSet[sortedOPUSet.length - 1].key} -{" "}
                  {sortedOPUSet[sortedOPUSet.length - 1].data}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                smallest:{" "}
                <span className="text-gray-900">
                  {sortedOPUSet[0].key} - {sortedOPUSet[0].data}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                average:{" "}
                <span className="text-gray-900">
                  {Math.round(
                    sortedOPUSet.reduce((a, b) => a + b.data, 0) /
                      sortedOPUSet.length
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-[500px] mt-8">
          <BarChart
            height={450}
            width={500}
            data={bookingGradeCountSet}
            series={<BarSeries />}
          />

          <div className="w-[240px] mx-auto mt-4">
            <h3 className="text-center text-lg mb-4">Booking Grade</h3>
            <p className="text-sm text-gray-500">
              largest:{" "}
              <span className="text-gray-900">
                {sortedBGCSet[sortedBGCSet.length - 1].key} -{" "}
                {sortedBGCSet[sortedBGCSet.length - 1].data}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              smallest:{" "}
              <span className="text-gray-900">
                {sortedBGCSet[0].key} - {sortedBGCSet[0].data}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              average:{" "}
              <span className="text-gray-900">
                {Math.round(
                  sortedBGCSet.reduce((a, b) => a + b.data, 0) /
                    sortedBGCSet.length
                )}
              </span>
            </p>
          </div>

          <PieChart
            height={500}
            width={500}
            data={[
              { key: "UnAssigned", data: unAssigned },
              { key: "Assigned", data: assigned },
            ]}
            displayAllLabels={true}
          />
          <div className="w-[240px] mx-auto -mt-8">
            <h3 className="text-lg mb-4">Unassigned vs Assigned Jobs</h3>
            <p className="text-sm text-gray-500">
              Unassigned jobs:{" "}
              <span className="text-gray-900">{unAssigned}</span>
            </p>
            <p className="text-sm text-gray-500">
              Assigned jobs: <span className="text-gray-900">{assigned}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-0 items-center">
        <div className="w-[700px] mt-4 flex flex-col"></div>
      </div>

      <div className="grid mb-6 md:grid-cols-2 py-4"></div>
    </>
  );
}
