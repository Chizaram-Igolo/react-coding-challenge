import { Fragment, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ISubset {
  id: number;
  name: string;
  dataName: string;
}

interface SubsetFilterComboBoxProps {
  subsets: ISubset[];
  currentFilterSubset: ISubset;
  onChangeFilterSubset(newSubset: ISubset): void;
}

const SubsetFilterComboBox: React.FC<SubsetFilterComboBoxProps> = ({
  subsets,
  currentFilterSubset,
  onChangeFilterSubset,
}) => {
  const [selected, setSelected] = useState<ISubset>(currentFilterSubset);
  const [query, setQuery] = useState("");

  const filteredSubsets =
    query === ""
      ? subsets
      : subsets.filter((subset) =>
          subset.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-[16rem] z-50">
      <Combobox
        value={selected}
        onChange={(val) => {
          setSelected(val);
          onChangeFilterSubset(val);
        }}
      >
        <div className="relative w-[16rem] mt-1 z-50">
          <div
            className="relative w-full cursor-default overflow-hidden 
                          rounded-lg bg-white text-left sm:text-sm"
          >
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 rounded-lg 
                         border border-gray-300 text-gray-900 
                       focus:ring-blue-300 focus:ring-1 
                       focus:border-blue-400"
              // @ts-ignore
              displayValue={(subset) => subset.name}
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
            <Combobox.Options
              className="absolute mt-1 max-h-80 w-full overflow-auto 
                         rounded-md bg-white py-1 text-base shadow-lg ring-1 
                         ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredSubsets.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredSubsets.map((subset) => (
                  <Combobox.Option
                    key={subset.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={subset}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-FiraSans_Medium" : "font-normal"
                          }`}
                        >
                          {subset.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-blue-600"
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
};

export default SubsetFilterComboBox;
