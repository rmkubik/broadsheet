import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { CreateUserForm } from "./user/CreateUserForm";

export function App() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const newUsers = await api.user.list.query();

      setUsers(newUsers);
    }

    fetchData();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(users, undefined, 2)}</pre>
      <CreateUserForm />
    </div>
  );
}
