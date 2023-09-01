/* eslint-disable react/prop-types */
import { Modal } from "../../components";
import { Form, useNavigate, useNavigation, useParams } from "react-router-dom";
import { Button } from "../../components/ui";

export function DeleteBoard() {
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
        className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-heading-lg text-danger">Delete this board?</h2>
        <p className="text-body-lg text-on-background">
          Are you sure you want to delete the &quot;{params.boardId}&quot;
          board? This action will remove all columns and tasks and cannot be
          reversed.{" "}
        </p>
        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            variant="danger"
            disabled={isSubmitting || isRedirecting}
            className="w-full"
          >
            {isSubmitting || isRedirecting ? "Deleting Board" : "Delete Board"}
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
