/* eslint-disable react/prop-types */
import {
  useFetcher,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Modal } from "../../components";
import { DropdownMenu } from "../../components/ui";
import { Checkbox, Dropdown } from "../../components/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function TaskView() {
  const {
    task: { title, description, status, subtasks },
  } = useLoaderData();

  const fetcher = useFetcher();

  // get board columns
  const columns = useOutletContext();

  // status dropdown options
  let columnId = 0;
  const dropdownOptions = [];

  // set board columns as status dropdown option
  for (const column of columns) {
    dropdownOptions.push({ id: columnId++, value: column.name });
  }

  const methods = useForm({
    defaultValues: {
      status: status,
    },
  });

  const params = useParams();

  const [selectedOption, setSelectedOption] = useState(status);

  const onSubmit = (data) => {
    fetcher.submit(data, {
      method: "post",
      action: `/board/${params.boardId}/task/${params.taskId}`,
    });
  };

  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option); // for ui
    methods.setValue("status", option.value); // for set value of react-hook-form input
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <fetcher.Form
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex justify-between items-center">
            <h2 className="text-heading-lg">{title}</h2>
            <DropdownMenu
              component="Task"
              LinkState={{
                title,
                description,
                status,
                subtasks,
              }}
            />
          </header>
          {description && (
            <p className="text-body-lg text-on-background">{description}</p>
          )}
          <section>
            <h3 className="text-body-md text-on-background mb-4">
              Subtasks{" "}
              {subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
              {subtasks.length}
            </h3>
            <ul className="flex flex-col gap-2">
              {subtasks.map((subtask, index) => (
                <li key={index}>
                  <Checkbox
                    label={subtask.title}
                    name={subtask.title}
                    checked={subtask.isCompleted}
                  />
                </li>
              ))}
            </ul>
          </section>
          <Dropdown
            name="status"
            options={dropdownOptions}
            selectedOption={selectedOption}
            onOptionChange={handleDropdownOptionChange}
            submit={methods.handleSubmit(onSubmit)}
          />
        </fetcher.Form>
      </FormProvider>
    </Modal>
  );
}
