import { Form } from "react-router-dom";
import { Modal } from "../components";
import { Input } from "../components/form";
import { RemovableInput } from "../components/form";
import { Button } from "../components/ui";
import { useState } from "react";

const initialColumns = [
  { id: 0, value: "Todo" },
  { id: 1, value: "Doing" },
];

let nextColumnId = initialColumns.length;

export function AddBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleAddColumn = () => {
    const nextColumn = [
      ...columns,
      { id: nextColumnId++, placeholder: "create new column" },
    ];

    setColumns(nextColumn);
  };

  const handleRemoveColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  return (
    <Modal>
      <Form
        method="post"
        className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
      >
        <h2 className="text-lg">Add New Board</h2>
        <Input label="Name" name="name" placeholder="e.g Web Design" />
        <section>
          <h3 className="mb-2 text-body-md text-on-background">Columns</h3>
          {columns.map((column, index) => (
            <RemovableInput
              key={column.id}
              label={`subtask ${index}`}
              label-sr-only="true"
              defaultValue={column?.value}
              placeholder={column?.placeholder}
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
        <Button>Create New Board</Button>
      </Form>
    </Modal>
  );
}
