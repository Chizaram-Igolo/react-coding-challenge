import Table from "components/Table/Table";

import data from "data/planning.json";
import { IData } from "data/types";

export default function Dashboard() {
  return <Table data={data as IData[]} />;
}
