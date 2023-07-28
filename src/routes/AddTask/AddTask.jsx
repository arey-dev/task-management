import { Form } from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { TextArea } from "../../components/form";
import { Button } from "../../components/ui";
import { RemovableInput } from "../../components/form";
import { Dropdown } from "../../components/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

const initialDropdownOptions = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
];

const initialSubtasks = [
  { id: 0, placeholder: "e.g. Make coffee" },
  { id: 1, placeholder: "e.g. Drink coffee & smile" },
];

let nextSubtasksId = initialSubtasks.length;

export function AddTask() {
  // fix status value

  const methods = useForm(); // react-hook-form

  // const submit = useSubmit();

  const [selectedOption, setSelectedOption] = useState(
    initialDropdownOptions[0]
  );

  const [subtasks, setSubtasks] = useState(initialSubtasks);

  // handler for adding a new subtask
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

  // handler for removing a subtask
  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  // handle for changing dropdown option
  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option);
  };

  const onSubmit = (data) => {
    console.log(data);

    // // programmatically submit a form for react-router
    // // to be in-sync with react-hook-form
    // submit(data, { method: "post", action: "/board/add-board" });
  };

  return (
    <>
      <Modal>
        <FormProvider {...methods}>
          <Form
            className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h2 className="text-lg">Add New Task</h2>

            <Input
              label="Title"
              name="title"
              placeholder="e.g. Take coffee break"
            />

            <TextArea
              label="Description"
              name="description"
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
                  name={`subtask ${index}`}
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
              name="status"
              options={initialDropdownOptions}
              selectedOption={selectedOption}
              onOptionChange={handleDropdownOptionChange}
            />

            <Button type="submit">Create Task</Button>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
}
