import { Form } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Input } from "../components/form/Input";
import { TextArea } from "../components/form/TextArea";
import { Button } from "../components/ui/Button";
import { RemovableInput } from "../components/form/RemovableInput";
import { Dropdown } from "../components/form/Dropdown";
import { useState } from "react";

const initialDropdownOptions = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
  { id: 2, value: "Done" },
];

const initialSubtasks = [
  { id: 0, placeholder: "e.g. Make coffee" },
  { id: 1, placeholder: "e.g. Drink coffee & smile" },
];

let nextSubtasksId = initialSubtasks.length;

export function AddTask() {
  const [selectedOption, setSelectedOption] = useState(
    initialDropdownOptions[0]
  );

  const [subtasks, setSubtasks] = useState(initialSubtasks);

  const handleAddSubtask = () => {
    const nextSubtask = [
      ...subtasks,
      {
        id: nextSubtasksId++,
        placeholder: "create new subtask",
      },
    ];

    setSubtasks(nextSubtask);
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option);
  };

  console.log(subtasks);

  return (
    <>
      <Modal>
        {/* modal content */}
        <Form
          method="post"
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
        >
          <h2 className="text-lg">Add New Task</h2>
          <Input label="Title" placeholder="e.g. Take coffee break" />
          <TextArea
            label="Description"
            placeholder="e.g. its's always good to take a break. This 15 minutes break will recharge the batteries a little."
            noresize
          />
          <section>
            <h3 className="mb-2 text-body-md text-on-background">Subtasks</h3>
            {subtasks.map((subtask, index) => (
              <RemovableInput
                key={subtask.id}
                label={`subtask ${index}`}
                label-sr-only="true"
                placeholder={subtask?.placeholder}
                onRemove={() => handleRemoveSubtask(subtask.id)}
              />
            ))}
            <Button
              onClick={handleAddSubtask}
              variant="secondary"
              className="w-full"
            >
              + Add New Subtask
            </Button>
          </section>
          <Dropdown
            options={initialDropdownOptions}
            selectedOption={selectedOption}
            onOptionChange={handleDropdownOptionChange}
          />
          <Button>Create Task</Button>
        </Form>
      </Modal>
    </>
  );
}
