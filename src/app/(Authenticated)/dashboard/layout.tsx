"use client";

import isAuth from "@/hoc/isAuth";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="prose lg:prose-xl dark:prose-invert max-w-full">
      <div className="flex justify-between mb-4 w-full">
        <h2>{user?.name}</h2>
        <a onClick={() => logout()}>Logout</a>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default isAuth(Layout);
