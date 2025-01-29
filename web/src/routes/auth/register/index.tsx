// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$, type QRL } from "@builder.io/qwik";
import { Link, routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import * as v from "valibot";

const RegisterSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("Please enter your name.")),
    email: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted."),
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your password."),
      v.minLength(8, "Your password must have 8 characters or more."),
    ),
    password_confirmation: v.pipe(
      v.string(),
      v.nonEmpty("Please confirm your password."),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["password_confirmation"]],
      (input) => input.password === input.password_confirmation,
      "The two passwords do not match.",
    ),
    ["password_confirmation"],
  ),
);
type RegisterForm = v.InferInput<typeof RegisterSchema>;

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => ({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
}));

export const useFormAction = formAction$<RegisterForm>((values) => {
  // Runs on server
}, valiForm$(RegisterSchema));

export default component$(() => {
  const [registerForm, { Form, Field }] = useForm<RegisterForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(RegisterSchema),
  });

  const nav = useNavigate();

  const handleSubmit: QRL<SubmitHandler<RegisterForm>> = $(
    async (values, event) => {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
      });

      console.log(response);

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        alert("Registration failed:", errorData);
        console.error("Registration failed:", errorData);
        return;
      }

      // Parse and log the response
      const data = await response.json();
      alert("Registration successful:", data);
      console.log("Registration successful:", data);
    },
  );

  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-6 text-center text-2xl font-semibold text-gray-800">
          Register
        </h2>
        <Form onSubmit$={handleSubmit} class="space-y-4">
          <Field name="name">
            {(field, props) => (
              <div>
                <label
                  for="name"
                  class="mb-1 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...props}
                  type="name"
                  id="name"
                  value={field.value}
                  class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                {field.error && (
                  <div class="mt-1 text-sm text-red-500">{field.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="email">
            {(field, props) => (
              <div>
                <label
                  for="email"
                  class="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  {...props}
                  type="email"
                  id="email"
                  value={field.value}
                  class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {field.error && (
                  <div class="mt-1 text-sm text-red-500">{field.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <div>
                <label
                  for="password"
                  class="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...props}
                  type="password"
                  id="password"
                  value={field.value}
                  class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                {field.error && (
                  <div class="mt-1 text-sm text-red-500">{field.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="password_confirmation">
            {(field, props) => (
              <div>
                <label
                  for="password_confirmation"
                  class="mb-1 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  {...props}
                  type="password"
                  id="password_confirmation"
                  value={field.value}
                  class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                {field.error && (
                  <div class="mt-1 text-sm text-red-500">{field.error}</div>
                )}
              </div>
            )}
          </Field>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            disabled={registerForm.submitting}
          >
            Register
          </button>
        </Form>
        <span>Already have an account? </span>
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
});
