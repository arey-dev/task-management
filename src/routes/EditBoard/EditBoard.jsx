import { Form, useOutletContext, useSubmit, useParams } from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { RemovableInput } from "../../components/form";
import { Button } from "../../components/ui";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export function EditBoard() {
  // get board columns
  const OutletContextData = useOutletContext();

  const params = useParams(); // to read boardId params

  const submit = useSubmit(); // to submit form by using react router

  // ids for initial values
  let initialColumnId = 0;
  let defaultValIndex = 0;
  // where to store initial columns state values
  const initialColumns = [];

  // where to store default values of react-hook-form
  const columnDefaultValues = { name: params.boardId };

  for (const column of OutletContextData) {
    initialColumns.push({ id: initialColumnId++, value: column.name });
    columnDefaultValues[`column-${defaultValIndex++}`] = column.name;
  }

  // multiple column state for board
  const [columns, setColumns] = useState(initialColumns);

  const [columnId, setColumnId] = useState(initialColumnId);

  // react-hook-form
  // destructure columnDefaultValues
  const methods = useForm({ defaultValues: { ...columnDefaultValues } });

  // handler for adding a column for a board
  const handleAddColumn = () => {
    const nextColumn = [
      ...columns,
      { id: columnId, placeholder: "create new column" },
    ];

    setColumnId((id) => id + 1);
    setColumns(nextColumn);
  };

  // handler for removing column for a board
  const handleRemoveColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const onSubmit = (data) => {
    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(data, {
      method: "post",
      action: `/board/${params.boardId}/edit-board`,
    });
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <Form
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h2 className="text-lg">Edit Board</h2>

          <Input label="Name" name="name" placeholder="e.g Web Design" />

          <section>
            <h3 className="mb-2 text-body-md text-on-background">Columns</h3>
            {columns.map((column, index) => (
              <RemovableInput
                key={column.id}
                label={`column ${index}`}
                label-sr-only="true"
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

          <Button type="submit">Save Changes</Button>
        </Form>
      </FormProvider>
    </Modal>
  );
}
