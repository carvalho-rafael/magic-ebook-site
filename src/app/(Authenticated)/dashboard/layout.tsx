"use client";

import Navbar from "@/components/dashboard/Navbar";
import isAuth from "@/hoc/isAuth";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="prose lg:prose-xl dark:prose-invert max-w-full  bg-accent min-h-screen">
      <Navbar user={user} logout={logout} />
      <div>{children}</div>
    </div>
  );
};

export default isAuth(Layout);
