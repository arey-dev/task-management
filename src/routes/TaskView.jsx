/* eslint-disable react/prop-types */
import { Form, useLoaderData } from "react-router-dom";
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
  const {
    task: { title, description, status, subtasks },
  } = useLoaderData();

  const [selectedOption, setSelectedOption] = useState(status);

  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Modal>
      <Form className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md">
        <header className="flex justify-between items-center">
          <h2 className="text-heading-lg">{title}</h2>
          <DropdownMenu />
        </header>
        {description && (
          <p className="text-body-lg text-on-background">{description}</p>
        )}
        <section>
          <h3 className="text-body-md text-on-background mb-4">
            Subtasks {subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
            of {subtasks.length}
          </h3>
          <ul className="flex flex-col gap-2">
            {subtasks.map((subtask) => (
              <li key={subtask.subtaskId}>
                <Checkbox label={subtask.title} checked={subtask.isCompleted} />
              </li>
            ))}
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
