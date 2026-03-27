import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "../form/FieldInfo";
import { signUp } from "../../lib/auth-client";
import { useState } from "react";

export function CreateUserForm() {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const response = await signUp.email(value);
      if (response.error) {
        setSubmissionError(
          response.error.message ?? "Unexpected error occurred",
        );
        return;
      }

      setSubmissionError(null);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        children={(field) => {
          return (
            <>
              <label htmlFor={field.name}>Name:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="email"
        children={(field) => {
          return (
            <>
              <label htmlFor={field.name}>Email:</label>
              <input
                id={field.name}
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="password"
        children={(field) => {
          return (
            <>
              <label htmlFor={field.name}>Password:</label>
              <input
                id={field.name}
                type="password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <>
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Register"}
            </button>
            {/* <button
              type="reset"
              onClick={(e) => {
                // Avoid unexpected resets of form elements (especially <select> elements)
                e.preventDefault();
                form.reset();
              }}
            >
              Reset
            </button> */}
          </>
        )}
      />
      <span>{submissionError}</span>
    </form>
  );
}
