"use client";

import EbookList from "@/components/dashboard/EbookList";
import { Button } from "@/components/ui/button";
import isAuth from "@/hoc/isAuth";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const router = useRouter();

  const [connected, setConnected] = useState<boolean>();

  const { fetchPrivate } = useContext(AuthContext);

  const authorizeMP = useCallback(async () => {
    const response: { url: string } = await fetchPrivate(
      `payments/authorization`,
      {}
    );
    if (response) {
      window.open(response.url);
    }
  }, [fetchPrivate]);

  const isConnectedMP = useCallback(async () => {
    const response: { isConnected: boolean } = await fetchPrivate(
      `payments/is-connected`,
      {}
    );
    setConnected(response.isConnected);
  }, [fetchPrivate]);

  useEffect(() => {
    isConnectedMP();
  }, [isConnectedMP]);

  return (
    <div className="flex flex-col px-4 pb-4 mt-4">
      {connected === true && (
        <div className="flex flex-col bg-green-500 py-4 px-4 rounded-2xl">
          <p className="!my-2 text-white">
            Parabéns! Você já está conectado com o Mercado Pago
          </p>
        </div>
      )}
      {connected === false && (
        <div className="flex flex-col bg-red-500 py-4 px-4 rounded-2xl">
          <p className="!my-2 text-white">
            Você ainda não se conectou com o Mercado Pago
          </p>
          <Button className="self-start" onClick={authorizeMP}>
            Conectar agora
          </Button>
        </div>
      )}
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-normal !my-4">SEUS E-BOOKS</h3>
        <Button
          size="lg"
          className="bg-theme-1 text-[18px]"
          onClick={() => {
            if (connected) {
              router.push("dashboard/ebooks/create");
            } else {
              toast("Você precisa se conectar ao Mercado Pago antes.", {
                style: { background: "red", color: "white" },
              });
            }
          }}
        >
          <span className="font-extrabold text-[18px]">+</span> Adicionar E-book
        </Button>
      </div>
      <EbookList />
    </div>
  );
};

export default isAuth(Dashboard);
