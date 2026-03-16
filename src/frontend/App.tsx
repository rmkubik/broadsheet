import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";

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
    </div>
  );
}
