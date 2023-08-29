import { Form, Link, useNavigation } from "react-router-dom";
import { Input } from "../../components/form";
import { Button } from "../../components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

export function Signup() {
  // react-hook-form
  const methods = useForm();

  const navigation = useNavigation();

  const submit = useSubmit(); // to submit form by using react router

  // navigation state values
  const isSubmitting = navigation.state === "submitting";

  const isRedirecting =
    navigation.state === "loading" &&
    navigation.json != null &&
    navigation.formAction !== navigation.location.pathname;

  const onSubmit = (data) => {
    // programmatically submit a form for react-router
    // to be in-sync with react-hook-form
    submit(data, {
      method: "post",
      action: `/login`,
    });
  };

  return (
    <FormProvider {...methods}>
      <Form
        className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h2 className="text-lg">Signup</h2>

        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="e.g john@doe.mail"
          disabled={isRedirecting || isSubmitting}
        />

        <Input
          type="password"
          label="Password"
          name="password"
          disabled={isRedirecting || isSubmitting}
        />

        <p className="text-sm">
          Already have an account?{" "}
          {
            <Link to="/login" className="inline-block text-primary hover:-translate-y-[2px] transition">
              Login here
            </Link>
          }
        </p>

        <Button type="submit" disabled={isRedirecting || isSubmitting}>
          {isSubmitting
            ? "Signing up..."
            : isRedirecting
            ? "Signed up"
            : "Sign up"}
        </Button>
      </Form>
    </FormProvider>
  );
}
