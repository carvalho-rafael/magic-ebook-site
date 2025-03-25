"use client";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import isAuth from "@/hoc/isAuth";
import { redirect } from "next/navigation";

const Login = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Users: {user?.name}</h1>
      <button
        onClick={() => {
          redirect("/carro");
        }}
      >
        <h3>User</h3>
      </button>
    </>
  );
};

export default isAuth(Login);
