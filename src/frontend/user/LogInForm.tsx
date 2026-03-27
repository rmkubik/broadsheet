import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { signIn } from "../../lib/auth-client";
import { FieldInfo } from "../form/FieldInfo";

export function LogInForm() {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const response = await signIn.email(value);
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
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Login"}
          </button>
        )}
      />
      <span>{submissionError}</span>
    </form>
  );
}
