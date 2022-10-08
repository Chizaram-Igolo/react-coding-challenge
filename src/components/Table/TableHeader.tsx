export default function TableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="py-3 px-6">
          Client Name
        </th>
        <th scope="col" className="py-3 px-6">
          Industry
        </th>
        <th scope="col" className="py-3 px-6">
          Status
        </th>
        <th scope="col" className="py-3 px-6">
          Booking Grade
        </th>
        <th scope="col" className="py-3 px-6">
          Talent Name
        </th>
        <th scope="col" className="py-3 px-6">
          Office City
        </th>
        <th scope="col" className="py-3 px-6">
          Skills
        </th>
        <th scope="col" className="py-3 px-6">
          Time Duration
        </th>
      </tr>
    </thead>
  );
}
