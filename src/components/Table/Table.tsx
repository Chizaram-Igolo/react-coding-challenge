import { Fragment, useEffect, useState } from "react";

import List from "components/List/List";
import { IData } from "data/types";
import { paginate } from "../../utils/paginate";
import TableHeader from "./TableHeader";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Pagination from "./Pagination";

const tableHeadings = [
  { id: 1, name: "ID", dataName: "id" },
  { id: 2, name: "Job ID", dataName: "originalId" },
  { id: 3, name: "Client Name", dataName: "clientName" },
  { id: 4, name: "Industry", dataName: "industry" },
  { id: 5, name: "Booking Grade", dataName: "bookingGrade" },
  { id: 6, name: "OP Unit", dataName: "operatingUnit" },
  { id: 7, name: "Office City", dataName: "officeCity" },
  { id: 8, name: "Skills", dataName: "skills" },
  { id: 9, name: "Time Duration", dataName: "timeDuration" },
];

interface TableProps {
  data: IData[];
}

interface IPeople {
  id: number;
  name: string;
}

const people: IPeople[] = [
  { id: 1, name: "Client Name" },
  { id: 2, name: "Industry" },
  { id: 3, name: "Booking Grade" },
  { id: 4, name: "OP Unit" },
  { id: 5, name: "Office City" },
];

function ComboboxFilter() {
  const [selected, setSelected] = useState<IPeople>(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-72 z-50">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-50">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              // @ts-ignore
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1  ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortedAndFilteredData, setSortedAndFilteredData] = useState<IData[]>(
    []
  );

  useEffect(() => {
    const paginatedData = paginate(data, currentPage, pageSize);
    setSortedAndFilteredData(paginatedData);
  }, [data, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (headingName: string) => {
    let sortedData = [...sortedAndFilteredData].sort((a, b) =>
      // @ts-ignore
      a[headingName].localeCompare(b[headingName], "en", { numeric: true })
    );

    setSortedAndFilteredData(sortedData);
  };

  if (data.length === 0) return <p>There are no items to display.</p>;

  return (
    <>
      <div className="flex py-4">
        <div className="py-4 px-4">Filter by:</div>
        <div>
          <ComboboxFilter />
        </div>
        <div className="p-4">Type to Search:</div>
        <div>
          <ComboboxFilter />
        </div>
      </div>

      <Pagination
        itemsCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeader tableHeadings={tableHeadings} handleSort={handleSort} />
          <List data={sortedAndFilteredData} />
        </table>
      </div>

      <Pagination
        itemsCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Table;
