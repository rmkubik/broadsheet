import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { CreateUserForm } from "./user/CreateUserForm";
import { LogInForm } from "./user/LogInForm";
import { signOut, useSession } from "../lib/auth-client";

export function App() {
  const [users, setUsers] = useState<any>([]);
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  useEffect(() => {
    async function fetchData() {
      const newUsers = await api.user.list.query();
      setUsers(newUsers);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <pre>{JSON.stringify(users, undefined, 2)}</pre>
      <h2>Sign up</h2>
      <CreateUserForm />
      <h2>Sign in</h2>
      <LogInForm />
      <h2>Session</h2>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
      <pre>{JSON.stringify(session, undefined, 2)}</pre>
    </div>
  );
}
