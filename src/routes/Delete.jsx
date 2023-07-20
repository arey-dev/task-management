/* eslint-disable react/prop-types */
import { Modal } from "../components";
import { Form } from "react-router-dom";
import { Button } from "../components/ui";

export function Delete() {
  return (
    <Modal>
      <Form className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md">
        <h2 className="text-heading-lg text-danger">Delete this board?</h2>
        <p className="text-body-lg text-on-background">
          Are you sure you want to delete the &quot;Platform Launch&quot; board?
          This action will remove all columns and tasks and cannot be reversed.{" "}
        </p>
        <div className="flex justify-between gap-4">
          <Button variant="danger" className="w-full">Delete</Button>
          <Button variant="secondary" className="w-full">Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
}
