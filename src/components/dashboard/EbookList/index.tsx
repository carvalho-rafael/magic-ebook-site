"use client";

import { Ebook } from "@/@types/ebook";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "@/components/Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaCopy, FaEdit } from "react-icons/fa";

const EbookList = () => {
  const router = useRouter();

  const { fetchPrivate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [ebooks, setEbooks] = useState<Ebook[]>();

  const fetchEbook = useCallback(async () => {
    setIsLoading(true);
    const response: Ebook[] = await fetchPrivate(`ebooks`, {});
    if (response) {
      setEbooks(response);
    }
    setIsLoading(false);
  }, [fetchPrivate, setIsLoading]);

  const deleteEbook = useCallback(
    async (id: number) => {
      const response: Ebook[] = await fetchPrivate(`ebooks/${id}`, {
        method: "DELETE",
      });
      if (response) {
        alert("Ebook excluído com sucesso");
        fetchEbook();
      }
    },
    [fetchPrivate, fetchEbook]
  );

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      fetchEbook();
    })();
  }, [fetchEbook]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {ebooks && !ebooks?.length && (
        <h3>Você ainda não cadastrou nenhum E-book para venda</h3>
      )}
      {ebooks?.map((ebook) => (
        <Card key={ebook.id} className="bg-gray-200">
          <CardHeader>
            <CardTitle>{ebook.label}</CardTitle>
          </CardHeader>
          <CardContent>{ebook.title} </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              <p className="!m-0">visitas {ebook.visits || 0}</p>
              <p className="!m-0">vendas {ebook.purchases || 0}</p>
            </div>
            <div className="flex justify-between w-full mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `${process.env.NEXT_PUBLIC_WEB_URL}checkout/${ebook.label}`
                    )
                    .then(() => {
                      toast("Link copiado.", {
                        style: { background: "green", color: "white" },
                      });
                    });
                }}
              >
                <FaCopy />
                Copiar link
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/dashboard/ebooks/${ebook.id}`)}
              >
                <FaEdit /> Editar
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  deleteEbook(ebook.id);
                }}
              >
                Excluir
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EbookList;
