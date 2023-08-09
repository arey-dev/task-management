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

// transform the data before passing to route action
// to avoid overwriting the completed subtasks
function transformFormData(obj, prevState) {
  // Create a Set of titles of completed subtasks from the prevState
  // use a Set to store the completed subtask titles, which provides faster lookup
  const completedSubtaskTitles = new Set(
    prevState.subtasks
      .filter((subtask) => subtask.isCompleted)
      .map((subtask) => subtask.title)
  );

  // Initialize an array to store transformed subtasks
  const subtasks = Object.entries(obj)
    // Filter only properties that start with "subtask"
    .filter(([key]) => key.startsWith("subtask"))
    // Map the filtered properties to an array of subtask objects
    // eslint-disable-next-line no-unused-vars
    .map(([key, value]) => ({
      title: value,
      isCompleted: completedSubtaskTitles.has(value), // Check if the subtask title is completed
    }));

  // Create the final data object with transformed subtasks
  const data = {
    title: obj.title,
    description: obj.description,
    subtasks,
    status: obj.status,
  };

  return data;
}

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

  // where we will store the initialSubtasks that came from
  // the state of this route
  let initialSubtaskId = 0;
  const initialSubtasks = [];

  // create an object that will store the default values of
  // react-hook-form's input
  let defaultValIndex = 0;
  const subtaskDefaultValues = {
    title: state.title,
    description: state.description,
    status: state.status,
  };

  for (const subtask of state.subtasks) {
    initialSubtasks.push({ id: initialSubtaskId++, title: subtask.title });
    subtaskDefaultValues[`subtask-${defaultValIndex++}`] = subtask.title;
  }

  // react-hook-form
  const methods = useForm({
    defaultValues: {
      // destructure subtaskDefaultValues
      ...subtaskDefaultValues,
    },
  });

  const params = useParams(); // to read boardId params

  const submit = useSubmit(); // to submit form by using react router

  // set dropdown option (ui only)
  const [selectedOption, setSelectedOption] = useState(state.status);

  const [subtaskId, setSubtaskId] = useState(initialSubtaskId);

  const [subtasks, setSubtasks] = useState(initialSubtasks);

  // handler for adding a new subtask
  const handleAddSubtask = () => {
    const nextSubtask = [
      ...subtasks,
      {
        id: subtaskId,
        placeholder: "create new subtask",
      },
    ];

    setSubtaskId((id) => id + 1);

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
    const updatedData = transformFormData(data, state);

    // submit data as json to preserve
    // the shape of the data
    submit(JSON.stringify(updatedData), {
      method: "post",
      action: `/board/${params.boardId}/task/${params.taskId}/edit-task`,
      encType: "application/json",
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

            <Button type="submit">Save Changes</Button>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
}
