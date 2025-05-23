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
      const response = await fetchPrivate<Ebook>(`ebooks/${id}`, {
        method: "GET",
      });
      if (response.success) {
        setEbook(response.data);
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
