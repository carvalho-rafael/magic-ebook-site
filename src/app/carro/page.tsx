"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import isAuth from "@/hoc/isAuth";
import { redirect } from "next/navigation";

type User = {
  email: string;
};

const Login = () => {
  const { user, fetchPrivate } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>();

  const getUsers = useCallback(async () => {
    if (!fetchPrivate) return;
    const response = await fetchPrivate<User[]>(
      "http://localhost:3333/users?type=carro",
      {}
    );

    if (response) {
      setUsers(response);
    }
  }, [fetchPrivate]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <h1>Carro: {user?.name}</h1>
      <ul>
        {users?.map((user: { email: string }) => (
          <li key={user.email}>{user.email}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          redirect("/users");
        }}
      >
        <h3>User</h3>
      </button>
    </>
  );
};

export default isAuth(Login);
