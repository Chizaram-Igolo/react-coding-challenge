import { Fragment, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ValueFilterComboBoxProps {
  filterValues: string[];
  currentFilterValue: string;
  onChangeFilterValue(newValue: string): void;
}

const ValueFilterComboBox: React.FC<ValueFilterComboBoxProps> = ({
  filterValues,
  currentFilterValue,
  onChangeFilterValue,
}) => {
  const [selected, setSelected] = useState<string>(currentFilterValue);
  const [query, setQuery] = useState("");

  const filteredValues =
    query === ""
      ? filterValues
      : filterValues.filter((value) =>
          value
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-72 z-50">
      <Combobox
        value={selected}
        onChange={(val) => {
          setSelected(val);
          onChangeFilterValue(val);
        }}
      >
        <div className="relative w-[28rem] mt-1 z-50">
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
              displayValue={(value) => value}
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
                         rounded-md bg-white py-1 text-base ring-1 
                         ring-opacity-5 sm:text-sm"
            >
              {filteredValues.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredValues.slice(0, 300).map((value) => (
                  <Combobox.Option
                    key={value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-FiraSans_Medium" : "font-normal"
                          }`}
                        >
                          {value}
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

export default ValueFilterComboBox;
