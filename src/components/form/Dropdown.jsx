/* eslint-disable react/prop-types */
import { useState } from "react";
import chevronDown from "../../assets/icon-chevron-down.svg";
import { Input } from "./Input";
import { twJoin } from "tailwind-merge";

export function Dropdown({
  name,
  options,
  selectedOption,
  onOptionChange,
  submit,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = selectedOption?.value
    ? selectedOption.value
    : selectedOption;

  return (
    <div className="relative">
      <Input label="Current Status" name={name} hidden />

      <button
        type="button"
        onClick={disabled ? null : () => setIsOpen(!isOpen)}
        className={twJoin(
          `flex py-2 px-4 justify-between items-center w-full border text-body-lg text-light-on-surface ${
            isOpen ? "border-primary" : "border-neutral-1 focus:ring-1"
          } rounded-md focus:outline-none focus:ring-primary dark:text-dark-on-surface`,
          disabled && "opacity-50"
        )}
      >
        {selected}
        <img src={chevronDown} alt="Chevron Down Icon" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full mt-3 dropdown-shadow flex flex-col gap-2 w-full bg-light-surface text-on-background text-body-lg p-4 rounded-md dark:bg-dark-background dark:shadow-md">
          {options.map((option) => (
            <li
              className="hover:text-primary hover:cursor-pointer"
              key={`${option.id}${option.value}`}
              onClick={() => {
                onOptionChange(option);
                setIsOpen(false);
                submit();
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
