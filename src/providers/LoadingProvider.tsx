"use client";

import React, { createContext, useEffect, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadingContainer = document.getElementById("loading-container");

    if (!loadingContainer) return;

    if (isLoading) {
      loadingContainer.classList.add("!flex");
    } else {
      loadingContainer.classList.remove("!flex");
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
