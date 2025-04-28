"use client";

import { useParams } from "next/navigation";
import EbookForm from "../form";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Ebook } from "@/@types/ebook";

const EbookEdit = () => {
  const { fetchPrivate } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [ebook, setEbook] = useState<Ebook>();

  const fetchEbook = useCallback(
    async (id: string) => {
      const response: Ebook = await fetchPrivate(`ebooks/${id}`, {
        method: "GET",
      });
      if (response) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setEbook(response);
      }
    },
    [fetchPrivate]
  );

  useEffect(() => {
    if (id) {
      fetchEbook(id);
    }
  }, [id, fetchEbook]);

  return <EbookForm isEdit={true} defaultValues={ebook} />;
};

export default EbookEdit;
