/* eslint-disable react/prop-types */
import {
  useFetcher,
  useLocation,
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
    state: { title, description, status, subtasks },
  } = useLocation();

  const fetcher = useFetcher();

  const methods = useForm({
    defaultValues: {
      status,
      ...subtasks,
    },
  });

  const params = useParams();

  // get board columns
  const {columns} = useOutletContext();

  // status dropdown options
  let columnId = 0;
  const dropdownOptions = [];

  // set board columns as status dropdown option
  for (const column of columns) {
    dropdownOptions.push({ id: columnId++, value: column.name });
  }

  const [selectedOption, setSelectedOption] = useState(status);

  // transform subtasks into array to process it much easier
  const subtaskArray = Object.entries(subtasks);

  const onSubmit = (data) => {
    fetcher.submit(JSON.stringify(data), {
      method: "post",
      action: `/board/${params.boardId}/task/${params.taskId}`,
      encType: "application/json",
    });
  };

  const handleDropdownOptionChange = (option) => {
    setSelectedOption(option); // for ui
    methods.setValue("status", option.value); // for set value of react-hook-form input
  };

  const handleCheck = (name, value) => {
    methods.setValue(name, value);
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
                subtasks: subtaskArray,
              }}
            />
          </header>
          {description && (
            <p className="text-body-lg text-on-background">{description}</p>
          )}
          <section>
            <h3 className="text-body-md text-on-background mb-4">
              Subtasks {subtaskArray.filter(([, value]) => value).length} of{" "}
              {subtaskArray.length}
            </h3>
            <ul className="flex flex-col gap-2">
              {subtaskArray.map(([key, value], index) => (
                <li key={index}>
                  <Checkbox
                    label={key}
                    name={key}
                    checked={value}
                    onToggle={handleCheck}
                    submit={methods.handleSubmit(onSubmit)}
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
