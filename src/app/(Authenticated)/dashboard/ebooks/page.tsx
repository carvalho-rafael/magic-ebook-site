"use client";

import { Button } from "@/components/ui/button";

import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import isAuth from "@/hoc/isAuth";
import { redirect } from "next/navigation";
import { Ebook } from "@/@types/ebook";
import Loading from "@/components/Loading";

const Ebooks = () => {
  const { fetchPrivate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [ebooks, setEbooks] = useState<Ebook[]>([]);

  const fetchEbook = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchPrivate<Ebook[]>(`ebooks`, {});
    if (response.success) {
      setEbooks(response.data);
    }
    setIsLoading(false);
  }, [fetchPrivate, setIsLoading]);

  const deleteEbook = useCallback(
    async (id: number) => {
      const response = await fetchPrivate(`ebooks/${id}`, {
        method: "DELETE",
      });
      if (response.success) {
        alert("Ebook excluído com sucesso");
        fetchEbook();
      }
    },
    [fetchPrivate, fetchEbook]
  );

  useEffect(() => {
    fetchEbook();
  }, [fetchEbook]);

  const authorizeMP = useCallback(async () => {
    const response = await fetchPrivate<{ url: string }>(
      `payments/authorization`,
      {}
    );
    if (response.success) {
      window.open(response.data.url, "_blank");
    }
  }, [fetchPrivate]);

  useEffect(() => {
    fetchEbook();
  }, [fetchEbook]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Título</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ebooks.map((ebook) => (
            <tr key={ebook.id}>
              <td>{ebook.title}</td>
              <td>
                <Button
                  onClick={() => redirect(`/dashboard/ebooks/${ebook.id}`)}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    deleteEbook(ebook.id);
                  }}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => redirect("/dashboard/ebooks/create")}>
        Criar Ebook
      </Button>
      <Button onClick={authorizeMP}>Autorizar Mercado Pago</Button>
    </div>
  );
};

export default isAuth(Ebooks);
