import Table from "components/Table/Table";

import data from "data/planning.json";

export default function Dashboard() {
  return <Table data={data} />;
}
