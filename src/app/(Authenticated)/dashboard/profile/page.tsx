"use client";

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const Ebooks = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-1 md:p-4">
      <h4>Nome</h4>
      <p className="text-gray-500">{user?.name}</p>
      <h4>Email</h4>
      <p className="text-gray-500">{user?.email}</p>
    </div>
  );
};

export default Ebooks;
