import {
  Form,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { TextArea } from "../../components/form";
import { Button } from "../../components/ui";
import { RemovableInput } from "../../components/form";
import { Dropdown } from "../../components/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

const initialSubtasks = [
  { id: 0, placeholder: "e.g. Make coffee" },
  { id: 1, placeholder: "e.g. Drink coffee & smile" },
];

let nextSubtasksId = initialSubtasks.length;

export function EditTask() {
  // get board columns
  const columns = useOutletContext();

  // status dropdown options
  let columnId = 0;
  const dropdownOptions = [];

  // set board columns as status dropdown option
  for (const column of columns) {
    dropdownOptions.push({ id: columnId++, value: column.name });
  }

  // get data from previous route
  const { state } = useLocation();

  let subtaskId = 0;
  // where we will store the values of task's current subtasks
  const currentSubtasks = [];

  // create an object that will store the default values of
  // react-hook-form's input
  let defaultValIndex = 0;
  const subtaskDefaultValues = {};

  for (const subtask of state.subtasks) {
    currentSubtasks.push({ id: subtaskId++, title: subtask.title });
    subtaskDefaultValues[`subtask-${defaultValIndex++}`] = subtask.title;
  }

  // react-hook-form
  const methods = useForm({
    defaultValues: {
      title: state.title,
      description: state.description,
      status: state.status,
      // destructure subtaskDefaultValues
      ...subtaskDefaultValues,
    },
  });

  const params = useParams(); // to read boardId params

  const submit = useSubmit(); // to submit form by using react router

  // set dropdown option (ui only)
  const [selectedOption, setSelectedOption] = useState(state.status);

  const [subtasks, setSubtasks] = useState(currentSubtasks);

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
    setSelectedOption(option); // for ui
    methods.setValue("status", option.value); // for set value of react-hook-form input
  };

  const onSubmit = (data) => {
    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(data, {
      method: "post",
      action: `/board/${params.boardId}/add-task`,
    });
  };

  return (
    <>
      <Modal>
        <FormProvider {...methods}>
          <Form
            className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h2 className="text-lg">Edit Task</h2>

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
                  label={`subtask-${index}`}
                  label-sr-only="true"
                  placeholder={subtask?.placeholder}
                  // match the name of keys in the defaultValues
                  // to display the current task's subtasks on ui
                  name={`subtask-${index}`}
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
              options={dropdownOptions}
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
