"use client";

import React, { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";

const isAuth = (WrappedComponent: React.ComponentType) => {
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
      if (!checkIsAuthenticated) {
        return;
      }

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
