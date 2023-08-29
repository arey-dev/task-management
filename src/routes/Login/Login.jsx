import { Form, Link, useNavigation } from "react-router-dom";
import { Flex } from "../../components";
import { Input } from "../../components/form";
import { Button } from "../../components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

export function Login() {
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
    <Flex center className="h-screen">
      <FormProvider {...methods}>
        <Form
          className="flex flex-col w-[30rem] gap-6 bg-light-surface p-8 rounded-md"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h2 className="text-lg">Login</h2>

          <Input
            type="email"
            label="Email"
            name="email"
            disabled={isRedirecting || isSubmitting}
          />

          <Input
            type="password"
            label="Password"
            name="password"
            disabled={isRedirecting || isSubmitting}
          />

          <p className="text-sm">
            No account yet?{" "}
            {
              <Link className="inline-block text-primary hover:-translate-y-[2px] transition">
                Create an account
              </Link>
            }
          </p>

          <Button type="submit" disabled={isRedirecting || isSubmitting}>
            {isSubmitting
              ? "Authenticating..."
              : isRedirecting
              ? "Logged In"
              : "Log in"}
          </Button>
        </Form>
      </FormProvider>
    </Flex>
  );
}
