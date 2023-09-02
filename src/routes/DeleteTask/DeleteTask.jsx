/* eslint-disable react/prop-types */
import { Modal } from "../../components";
import { Form, useParams, useNavigation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";

export function DeleteTask() {
  const params = useParams();

  const navigate = useNavigate();

  const navigation = useNavigation();

  // navigation state values
  const isSubmitting = navigation.state === "submitting";

  const isRedirecting =
    navigation.state === "loading" &&
    navigation.formAction !== navigation.location.pathname;

  return (
    <Modal>
      <Form
        method="post"
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md dark:bg-dark-surface"
      >
        <h2 className="text-heading-lg text-danger">Delete this Task?</h2>
        <p className="text-body-lg text-on-background">
          Are you sure you want to delete the &quot;{params.taskId}&quot; task
          and its subtasks? This action cannot be reversed.{" "}
        </p>
        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            variant="danger"
            disabled={isSubmitting || isRedirecting}
            className="w-full"
          >
            {isSubmitting || isRedirecting ? "Deleting Task" : "Delete Task"}
          </Button>
          <Button
            variant="secondary"
            disabled={isSubmitting || isRedirecting}
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
