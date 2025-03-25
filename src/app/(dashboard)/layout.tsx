"use client";

import isAuth from "@/hoc/isAuth";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p>{user?.name}</p>
        <a href="http://localhost:3333/auth/logout" rel="noopener noreferrer">
          Logout
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default isAuth(Layout);
