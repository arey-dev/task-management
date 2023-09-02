import { Form, useSubmit, useNavigation, useParams } from "react-router-dom";
import { Modal } from "../../components";
import { Input } from "../../components/form";
import { Button } from "../../components/ui";
import { useForm, FormProvider } from "react-hook-form";

export function AddColumn() {
  const methods = useForm(); // react-hook-form

  const submit = useSubmit();

  const navigation = useNavigation();

  const params = useParams();

  // navigation state values
  const isSubmitting = navigation.state === "submitting";

  const isRedirecting =
    navigation.state === "loading" &&
    navigation.json != null &&
    navigation.formAction !== navigation.location.pathname;

  const onSubmit = (data) => {
    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(JSON.stringify(data), {
      method: "post",
      action: `/board/${params.boardId}/add-column`,
      encType: "application/json",
    });
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <Form
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md dark:bg-dark-surface"
          onSubmit={methods.handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg text-light-on-surface dark:text-dark-on-surface">Add New Column</h2>

          <Input
            label="Name"
            name="name"
            disabled={isSubmitting || isRedirecting}
            placeholder="e.g Todo"
          />

          <Button type="submit" disabled={isSubmitting || isRedirecting}>
            {isSubmitting
              ? "Adding Column"
              : isRedirecting
              ? "Column Added"
              : "Add Column"}
          </Button>
        </Form>
      </FormProvider>
    </Modal>
  );
}
