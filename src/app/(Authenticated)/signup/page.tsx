"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

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
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import { LoadingContext } from "@/providers/LoadingProvider";
import { sendGAEvent } from "@next/third-parties/google";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não conferem",
        path: ["confirmPassword"],
      });
    }
  });

const Login = () => {
  const { isAuthenticated, signup } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await signup(values.name, values.email, values.password);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-2/5 bg-black py-4 flex flex-col justify-center items-center">
        <Image
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={180}
          height={80}
        />
      </div>
      <div className="w-full h-2 sm:w-2 sm:h-auto bg-theme-1"></div>
      <div className="sm:w-3/5 flex flex-col items-center justify-center h-screen bg-accent">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-[380px] max-w-full px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="meuemail@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme a Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg">
              Cadastrar
            </Button>
          </form>
        </Form>
        <div className="h-2 w-2 rounded-[20px] bg-gray-300 my-4"></div>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`}
          rel="noopener noreferrer"
          onClick={() => {
            sendGAEvent({
              event: "conversion_event_signup_2",
              value: {
                email: "from google login",
              },
            });
          }}
        >
          <Button type="button" size="lg">
            <FcGoogle /> Entre com o Google
          </Button>
        </a>
        <hr className="my-4 w-[280px]" />
        <div>
          <p>
            Já tem cadastro?
            <a href="/login" rel="noopener noreferrer">
              <Button
                type="button"
                size="lg"
                variant="link"
                className="!px-2 font-bold text-[18px]"
              >
                Faça login
              </Button>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
