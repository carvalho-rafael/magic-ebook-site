"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Tiptap from "@/components/TipTap/TipTap";

const formSchema = z.object({
  title: z.string().min(2),
  label: z.string(),
  description: z.string(),
  body: z.string(),
  value: z.string(),
});

type IRequest = {
  isEdit: boolean;
  defaultValues?: {
    id: number;
    title: string;
  };
};

const EbookForm = ({ isEdit, defaultValues }: IRequest) => {
  const { fetchPrivate } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      label: "",
      description: "",
      body: "",
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit ? `ebooks/${defaultValues?.id}` : "ebooks";
    const body = JSON.stringify(values);

    await fetchPrivate(url, {
      method,
      body,
    });
  }

  useEffect(() => {
    if (isEdit && defaultValues) {
      form.reset(defaultValues);
    }
  }, [isEdit, defaultValues, form]);

  return (
    <div>
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Tiptap
              initialContent={form.getValues("body")}
              onChange={(bodyHtml) => {
                form.setValue("body", bodyHtml);
              }}
            />
          </div>

          <Button type="submit" className="self-start">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EbookForm;
