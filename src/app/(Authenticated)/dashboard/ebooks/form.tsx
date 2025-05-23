"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "react-currency-mask";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Tiptap from "@/components/TipTap/TipTap";
import { LoadingContext } from "@/providers/LoadingProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaUpload } from "react-icons/fa";

const formSchema = z.object({
  title: z.string().min(2),
  label: z.string().min(2),
  description: z.string(),
  body: z.string().min(2),
  value: z.number().min(5),
  file: z.any(),
});

type IRequest = {
  isEdit: boolean;
  defaultValues?: {
    id: number;
    title: string;
    value: string;
    filename?: string;
  };
};

const EbookForm = ({ isEdit, defaultValues }: IRequest) => {
  const { fetchPrivate } = useContext(AuthContext);

  const { setIsLoading } = useContext(LoadingContext);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      label: "",
      description: "",
      body: "",
      value: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit ? `ebooks/${defaultValues?.id}` : "ebooks";
    const label = values.label.replace(/[^a-z0-9-]+/g, "");

    const formdata = new FormData();
    formdata.append("file", values.file);
    formdata.append("title", values.title);
    formdata.append("label", label);
    formdata.append("description", values.description);
    formdata.append("body", values.body);
    formdata.append("value", String(values.value));

    const response = await fetchPrivate(url, {
      method,
      body: formdata,
    });

    if (response.success) {
      setIsLoading(false);
      router.push("/dashboard");
      return;
    } else {
      setIsLoading(false);
      if (response.status === 400) {
        toast(response.erro, {
          style: { background: "yellow" },
        });
        return;
      }
      toast("Erro ao salvar E-book", {
        style: { background: "red", color: "white" },
      });
    }
  }

  useEffect(() => {
    if (isEdit && defaultValues) {
      form.reset({
        ...defaultValues,
        value: Number(defaultValues.value),
      });
    }
  }, [isEdit, defaultValues, form]);

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label (nome que aparecerá na url)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      onKeyDown={(e) => {
                        if (!e.key.match(/^[a-zA-Z0-9-]/g)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (min R$ 5,00)</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChangeValue={(_, value) => {
                        field.onChange(value);
                      }}
                      InputElement={<Input />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-2 p-2">
            {defaultValues?.filename && (
              <div>
                <span className="text-sm">
                  Arquivo atual: {defaultValues.filename}
                </span>
                <p className="text-sm">
                  Para substituir o arquivo atual, selecione um novo arquivo
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="file-pdf"
                    className="flex flex-col items-start"
                  >
                    Adicionar arquivo PDF
                    <div className="flex gap-4">
                      <FaUpload size="20" className="ml-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {value?.name || "Nenhum arquivo selecionado"}
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      className="hidden"
                      id="file-pdf"
                      type="file"
                      title="Selecionar arquivo"
                      accept="application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>
              Texto que aparecerá na página de venda do E-book.
            </FormLabel>
            <Tiptap
              initialContent={form.getValues("body")}
              onChange={(bodyHtml) => {
                form.setValue("body", bodyHtml);
              }}
            />
          </div>

          <Button type="submit" className="self-start">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EbookForm;
