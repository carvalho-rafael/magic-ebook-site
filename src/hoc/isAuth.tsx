"use client";

import React, { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

const isAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const IsAuth: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    useEffect(() => {
      if (isLoading) return;

      if (!isAuthenticated) {
        console.log("isAuth: Not authenticated");
        return redirect("/login");
      }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
      return <div></div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return IsAuth;
};

export default isAuth;
