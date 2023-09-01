import { Form, useNavigation, useParams } from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { TextArea } from "../../components/form";
import { Button } from "../../components/ui";
import { RemovableInput } from "../../components/form";
import { Dropdown } from "../../components/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSubmit, useOutletContext } from "react-router-dom";

const initialSubtasks = [
  { id: 0, placeholder: "e.g. Make coffee" },
  { id: 1, placeholder: "e.g. Drink coffee & smile" },
];

let nextSubtasksId = initialSubtasks.length;

export function AddTask() {
  // get board columns
  const { columns } = useOutletContext();

  // status dropdown options
  let columnId = 0;
  const dropdownOptions = [];

  // set board columns as status dropdown option
  for (const column of columns) {
    dropdownOptions.push({ id: columnId++, value: column.name });
  }

  // react-hook-form
  const methods = useForm({
    defaultValues: {
      status: dropdownOptions[0].value,
    },
  });

  const navigation = useNavigation();

  const params = useParams(); // to read boardId params

  const submit = useSubmit(); // to submit form by using react router

  // navigation state values
  const isSubmitting = navigation.state === "submitting";

  const isRedirecting =
    navigation.state === "loading" &&
    navigation.json != null &&
    navigation.formAction !== navigation.location.pathname;

  // set dropdown option (ui only)
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);

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
    setSelectedOption(option); // for ui
    methods.setValue("status", option.value); // for set value of react-hook-form input
  };

  const onSubmit = (data) => {
    const tranformedData = transformFormData(data);
    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(JSON.stringify(tranformedData), {
      method: "post",
      action: `/board/${params.boardId}/add-task`,
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
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg">Add New Task</h2>

            <Input
              label="Title"
              name="title"
              placeholder="e.g. Take coffee break"
              disabled={isRedirecting || isSubmitting}
            />

            <TextArea
              label="Description"
              name="description"
              placeholder="e.g. its's always good to take a break. This 15 minutes break will recharge the batteries a little."
              noresize
              disabled={isRedirecting || isSubmitting}
            />

            <section>
              <h3 className="mb-2 text-body-md text-on-background">Subtasks</h3>
              {subtasks.map((subtask, index) => (
                <RemovableInput
                  key={subtask.id}
                  label={`subtask-${index}`}
                  label-sr-only="true"
                  placeholder={subtask?.placeholder}
                  name={`subtask-${index}`}
                  onRemove={() => handleRemoveSubtask(subtask.id)}
                  disabled={isRedirecting || isSubmitting}
                />
              ))}
              <Button
                onClick={handleAddSubtask}
                variant="secondary"
                disabled={isRedirecting || isSubmitting}
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
              disabled={isRedirecting || isSubmitting}
            />

            <Button type="submit" disabled={isRedirecting || isSubmitting}>
              {isSubmitting
                ? "Creating task"
                : isRedirecting
                ? "Task Created"
                : "Create task"}
            </Button>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
}

function transformFormData(obj) {
  // Transform subtasks directly using reduce
  const subtasks = Object.entries(obj)
    .filter(([key]) => key.startsWith("subtask"))
    .reduce((acc, [, value]) => {
      acc[value] = false;
      return acc;
    }, {});

  const data = {
    title: obj.title,
    description: obj.description,
    subtasks,
    status: obj.status,
  };

  return data;
}
