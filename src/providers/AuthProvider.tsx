"use client";

import { fetcher } from "@/utils/fetcher";
import { jwtDecode } from "jwt-decode";

import React, { createContext, useCallback, useState } from "react";

type AuthContextType = {
  user?: User;
  isAuthenticated?: boolean;
  isLoaded?: boolean;
  checkIsAuthenticated?: () => void;
  fetchPrivate?: <T>(url: string, options: RequestInit) => Promise<T>;
};

type JwtPayload = {
  name: string;
  email: string;
};

type User = JwtPayload;

export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getAccessToken = useCallback((): string | undefined => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split("; ");
      let access_token;
      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === "access_token") {
          access_token = value;
        }
      }

      return access_token;
    }
  }, []);

  const refresh = useCallback(async (): Promise<boolean> => {
    const response = await fetch("http://localhost:3333/auth/refresh", {
      method: "GET",
      credentials: "include",
    });
    return response.ok;
  }, []);

  const fetchPrivate = useCallback(
    async (url: string, options: RequestInit) => {
      let accessToken = getAccessToken();

      if (!accessToken) {
        setIsAuthenticated(false);
        return null;
      }

      try {
        const response = await fetcher(accessToken, url, options);

        if (response.status === 401) {
          const refreshSuccess = await refresh();
          if (refreshSuccess) {
            accessToken = getAccessToken();
            if (!accessToken) {
              setIsAuthenticated(false);
              return null;
            }
            const retryResponse = await fetcher(accessToken, url, options);
            return await retryResponse.json();
          } else {
            setIsAuthenticated(false);
            return null;
          }
        }
        if (!response.ok) {
          throw new Error("Request failed");
        }

        return await response.json();
      } catch (error: unknown) {
        console.log(error);
      }
      return null;
    },
    [getAccessToken, refresh]
  );

  const checkIsAuthenticated = useCallback(async () => {
    setIsLoaded(false);
    const isRefreshed = await refresh();

    if (isRefreshed) {
      const accessToken = getAccessToken();
      setIsAuthenticated(!!accessToken);
      if (accessToken) {
        const { name, email } = jwtDecode<JwtPayload>(accessToken);
        setUser({ name, email });
      }
      setIsLoaded(true);
    } else {
      setIsAuthenticated(false);
    }

    return isRefreshed;
  }, [getAccessToken, refresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchPrivate,
        isAuthenticated,
        checkIsAuthenticated,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
