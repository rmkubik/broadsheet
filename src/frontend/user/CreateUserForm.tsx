import { useForm } from "@tanstack/react-form";
import { api } from "../api";
import { FieldInfo } from "../form/FieldInfo";

export function CreateUserForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      api.user.create.mutate({ name: value.name, email: value.email });
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
              {isSubmitting ? "..." : "Submit"}
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
    </form>
  );
}
