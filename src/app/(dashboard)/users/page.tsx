"use client";

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { redirect } from "next/navigation";

export default function Users() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Users: {user?.name}</h1>
      <button
        onClick={() => {
          redirect("/carro");
        }}
      >
        <h3>Carro</h3>
      </button>
    </>
  );
}
