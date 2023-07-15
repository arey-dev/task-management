import { useState } from "react";
import chevronDown from "../../assets/icon-chevron-down.svg";
import { Input } from "./Input";

const initialOptions = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
  { id: 2, value: "Done" },
  { id: 4, value: "later" },
  { id: 5, value: "tomorrow" },
];

export function Dropdown() {
  const [option, setOption] = useState(initialOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input label="Status" value={option.value} hidden />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex py-2 px-4 justify-between items-center w-full border text-body-lg border-neutral-1 rounded-md outline-primary"
      >
        {option.value}
        <img src={chevronDown} alt="Chevron Down Icon" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 top-full mt-3 dropdown-shadow flex flex-col gap-2 w-full bg-light-surface text-on-background text-body-lg p-4 rounded-md">
          {initialOptions.map((option) => (
            <li
              className="hover:cursor-pointer"
              key={`${option.id}${option.value}`}
              onClick={() => handleOptionChange(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
