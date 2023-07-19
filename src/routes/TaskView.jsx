/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";
import { Modal } from "../components";
import { DropdownMenu } from "../components/ui";
import { Checkbox, Dropdown } from "../components/form";
import { useState } from "react";

const initialDropdownOptions = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
  { id: 2, value: "Done" },
];

export function TaskView() {
  const [selectedOption, setSelectedOption] = useState(
    initialDropdownOptions[0]
  );

  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Modal>
      <Form className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md">
        <header className="flex justify-between items-center">
          <h2 className="text-heading-lg">
            Research pricing points of various competitors and trial different
            business models
          </h2>
          <DropdownMenu />
        </header>
        <p className="text-body-lg text-on-background">
          We know what we&apos;re planning to build for version one. Now we need
          to finalise the first pricing model we&apos;ll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
        <section>
          <h3 className="text-body-md text-on-background mb-4">
            Subtasks (2 of 3)
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Checkbox
                label="Research competitor pricing and business models"
                checked={true}
              />
            </li>
            <li>
              <Checkbox
                label="Outline a business model that works for our solution"
                checked={true}
              />
            </li>
            <li>
              <Checkbox label="Talk to potential customers about our proposed solution and ask for fair price expectancy" />
            </li>
          </ul>
        </section>
        <Dropdown
          options={initialDropdownOptions}
          selectedOption={selectedOption}
          onOptionChange={handleDropdownOptionChange}
        />
      </Form>
    </Modal>
  );
}
