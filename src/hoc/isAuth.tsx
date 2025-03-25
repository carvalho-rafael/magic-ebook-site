"use client";

import React, { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAuth = (WrappedComponent: any) => {
  return function IsAuth(props: object) {
    const { isAuthenticated, checkIsAuthenticated, isLoaded } =
      useContext(AuthContext);

    useEffect(() => {
      if (isAuthenticated === false) {
        return redirect("/login");
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (isLoaded) return;

      checkIsAuthenticated();
    }, [checkIsAuthenticated, isLoaded]);

    if (isAuthenticated === false) {
      return null;
    }

    if (!isLoaded) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default isAuth;
