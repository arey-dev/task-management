/* eslint-disable react/prop-types */
import { useState } from "react";
import chevronDown from "../../assets/icon-chevron-down.svg";
import { Input } from "./Input";

export function Dropdown({ options, selectedOption, onOptionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Input label="Status" defaultValue={selectedOption.value} hidden />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex py-2 px-4 justify-between items-center w-full border text-body-lg border-neutral-1 rounded-md outline-primary"
      >
        {selectedOption.value}
        <img src={chevronDown} alt="Chevron Down Icon" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 top-full mt-3 dropdown-shadow flex flex-col gap-2 w-full bg-light-surface text-on-background text-body-lg p-4 rounded-md">
          {options.map((option) => (
            <li
              className="hover:text-primary hover:cursor-pointer"
              key={`${option.id}${option.value}`}
              onClick={() => {
                onOptionChange(option);
                setIsOpen(false)
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
