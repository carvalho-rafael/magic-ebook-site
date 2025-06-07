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
import { FaCopy, FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EbookList = () => {
  const router = useRouter();

  const { fetchPrivate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [ebooks, setEbooks] = useState<Ebook[]>();

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
        console.log(response);
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
                      `${process.env.NEXT_PUBLIC_WEB_URL}/checkout/${ebook.label}`
                    )
                    .then(() => {
                      toast("Link copiado.", {
                        style: { background: "green", color: "white" },
                      });
                    });
                }}
              >
                <FaCopy /> <span className="hidden md:inline">Copiar</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_WEB_URL}/checkout/${ebook.label}`
                  )
                }
              >
                <FaExternalLinkAlt />{" "}
                <span className="hidden md:inline">Acessar</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/dashboard/ebooks/${ebook.id}`)}
              >
                <FaEdit />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <FaTrash />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remover o ebook?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deleteEbook(ebook.id);
                      }}
                    >
                      Sim{" "}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EbookList;
