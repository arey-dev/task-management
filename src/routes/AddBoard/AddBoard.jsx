import { Form, useSubmit } from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { RemovableInput } from "../../components/form";
import { Button } from "../../components/ui";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const initialColumns = [
  { id: 0, value: "Todo", placeholder: "create new column" },
  { id: 1, value: "Doing", placeholder: "create new column" },
];

let nextColumnId = initialColumns.length;

export function AddBoard() {
  const methods = useForm(); // react-hook-form

  const submit = useSubmit();

  // multiple column state for board
  const [columns, setColumns] = useState(initialColumns);

  // handler for adding a column for a board
  const handleAddColumn = () => {
    const nextColumn = [
      ...columns,
      { id: nextColumnId++, value: "", placeholder: "create new column" },
    ];

    setColumns(nextColumn);
  };

  // handler for removing column for a board
  const handleRemoveColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const onSubmit = (data) => {
    const transformedData = transformFormData(data);

    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(JSON.stringify(transformedData), {
      method: "post",
      action: "/board/add-board",
      encType: "application/json",
    });
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <Form
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
          onSubmit={methods.handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg">Add New Board</h2>

          <Input label="Name" name="name" placeholder="e.g Web Design" />

          <section>
            <h3 className="mb-2 text-body-md text-on-background">Columns</h3>
            {columns.map((column, index) => (
              <RemovableInput
                key={column.id}
                label={`column ${index}`}
                label-sr-only="true"
                defaultValue={column.value}
                placeholder={column.placeholder}
                name={`column-${index}`}
                onRemove={() => handleRemoveColumn(column.id)}
              />
            ))}

            <Button
              onClick={handleAddColumn}
              variant="secondary"
              className="w-full"
            >
              + Add New Column
            </Button>
          </section>

          <Button type="submit">Create New Board</Button>
        </Form>
      </FormProvider>
    </Modal>
  );
}

function transformFormData(obj) {
  const columns = Object.keys(obj)
    .filter((key) => key.includes("column"))
    .map((key) => ({ name: obj[key] }));

  return {
    name: obj.name,
    columns: columns,
  };
}
