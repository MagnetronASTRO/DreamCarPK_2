// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$, type QRL } from "@builder.io/qwik";
import { Link, routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$, setError } from "@modular-forms/qwik";
import * as v from "valibot";

const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

const LoginSchema = v.object({
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
});

type LoginForm = v.InferInput<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: "",
  password: "",
}));

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    // action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  const nav = useNavigate();

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $(async (values) => {
    const response = await fetch(`${endpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();

      document.cookie = `auth_token=${data.token}; Path=/; SameSite=Lax;`;

      nav("/", { replaceState: true, forceReload: true });
    } else {
      // 4. Handle non-2xx responses
      switch (response.status) {
        case 401: {
          const json = await response.json();
          const message = json.message;
          setError(loginForm, key as "password", message);
          break;
        }
        case 422: {
          const json = await response.json();
          const errors = json.errors;
          // Populate form errors
          Object.keys(errors).forEach((key) => {
            setError(loginForm, key as "email" | "password", errors[key]);
          });
          break;
        }
        default:
          throw new Error(
            "Sorry, there was an error when logging in. Refresh the page and try again.",
          );
      }
    }
  });

  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>
        <Form onSubmit$={handleSubmit} class="space-y-4">
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
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            disabled={loginForm.submitting}
          >
            {!loginForm.submitting && <span>Login</span>}

            {loginForm.submitting && <span>Logging in ... </span>}
          </button>
        </Form>
        <span>Don't have an account yet? </span>
        <Link href="/auth/register">Register</Link>
      </div>
    </div>
  );
});
