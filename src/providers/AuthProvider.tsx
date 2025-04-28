"use client";

import { fetcher } from "@/utils/fetcher";
import { jwtDecode } from "jwt-decode";

import React, { createContext, useCallback, useEffect, useState } from "react";

type AuthContextType = {
  user?: User;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  fetchPrivate: <T>(url: string, options: RequestInit) => Promise<T>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type JwtPayload = {
  name: string;
  email: string;
};

type User = JwtPayload;

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    try {
      const response = await fetcher("auth/refresh", {
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      console.log("Error refreshing token: ", error);
      return false;
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      console.log("login");
      const response = await fetcher("auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.status === 200) {
        const accessToken = getAccessToken();
        if (accessToken) {
          try {
            const { name, email } = jwtDecode<JwtPayload>(accessToken);
            setUser({ name, email });
            setIsAuthenticated(true);
          } catch {
            setIsAuthenticated(false);
          }
        }
      }
    },
    [getAccessToken]
  );

  const logout = useCallback(async () => {
    const response = await fetcher("auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchPrivate = useCallback(
    async (url: string, options: RequestInit) => {
      let accessToken = getAccessToken();

      if (!accessToken) {
        const refreshSuccess = await refresh();
        if (refreshSuccess) {
          accessToken = getAccessToken();
          if (accessToken) {
            try {
              const { name, email } = jwtDecode<JwtPayload>(accessToken);
              setUser({ name, email });
              setIsAuthenticated(true);

              const retryResponse = await fetcher(url, options, accessToken);

              return await retryResponse.json();
            } catch {
              setIsAuthenticated(false);
              return null;
            }
          }
        }
        setIsAuthenticated(false);
        return null;
      }

      try {
        const response = await fetcher(url, options, accessToken);

        if (response.status === 401) {
          const refreshSuccess = await refresh();
          if (refreshSuccess) {
            accessToken = getAccessToken();
            if (accessToken) {
              const retryResponse = await fetcher(url, options, accessToken);
              return await retryResponse.json();
            } else {
              setIsAuthenticated(false);
              return null;
            }
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
    setIsLoading(true);
    let accessToken = getAccessToken();

    if (accessToken) {
      try {
        const { name, email } = jwtDecode<JwtPayload>(accessToken);
        setUser({ name, email });
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      } catch {
        setIsAuthenticated(false);
        setIsLoading(false);
        console.log("Token expired");
        return;
      }
    }

    const isRefreshed = await refresh();

    if (isRefreshed) {
      accessToken = getAccessToken();
      if (accessToken) {
        try {
          const { name, email } = jwtDecode<JwtPayload>(accessToken);
          setUser({ name, email });
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        } catch {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
      }
    }
    setIsAuthenticated(false);
    setIsLoading(false);
  }, [getAccessToken, refresh]);

  useEffect(() => {
    checkIsAuthenticated();
  }, [checkIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchPrivate,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
