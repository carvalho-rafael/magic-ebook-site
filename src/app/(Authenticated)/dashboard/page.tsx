"use client";

import EbookList from "@/components/dashboard/EbookList";
import { Button } from "@/components/ui/button";
import isAuth from "@/hoc/isAuth";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();

  const [connected, setConnected] = useState<boolean>();

  const { fetchPrivate } = useContext(AuthContext);

  const authorizeMP = useCallback(async () => {
    const response = await fetchPrivate<{ url: string }>(
      `payments/authorization`,
      {}
    );
    if (response.success) {
      window.open(response.data.url);
    }
  }, [fetchPrivate]);

  const isConnectedMP = useCallback(async () => {
    const response = await fetchPrivate<{ isConnected: boolean }>(
      `payments/is-connected`,
      {}
    );
    if (response.success) {
      setConnected(response.data.isConnected);
    }
  }, [fetchPrivate]);

  useEffect(() => {
    isConnectedMP();
  }, [isConnectedMP]);

  return (
    <div className="flex flex-col px-4 pb-4 mt-4">
      {connected === true && (
        <div className="flex flex-col bg-green-500 py-4 px-4 rounded-2xl">
          <p className="!my-2 text-white">
            Parabéns! Você já está conectado com o Mercado Pago. <br />
            <span className="text-sm">
              * Para habilitar o PIX você precisa apenas cadastrar alguma chave
              na sua conta.
            </span>
          </p>
        </div>
      )}
      {connected === false && (
        <div className="flex flex-col bg-red-500 py-4 px-4 rounded-2xl">
          <p className="!my-2 text-white">
            Você ainda não se conectou com o Mercado Pago
          </p>
          <span className="text-sm">
            * Essa etapa é necessária para que você possa receber pelas vendas
            dos seus ebooks.
          </span>
          <span className="text-sm">
            * A página de vendas só funcionará completamente após esse passo.
          </span>
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
            router.push("dashboard/ebooks/create");
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
