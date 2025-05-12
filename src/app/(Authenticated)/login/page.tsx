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
import Loading from "@/components/Loading";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(4),
});

const Login = () => {
  const { isAuthenticated, login, isLoading } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await login(values.email, values.password);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loading />
      </div>
    );
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
            className="flex flex-col gap-4 w-[280px] max-w-full px-4"
          >
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
                    <Input placeholder="" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg">
              Entrar
            </Button>
          </form>
        </Form>
        <div className="h-2 w-2 rounded-[20px] bg-gray-300 my-4"></div>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}auth/google/login`}
          rel="noopener noreferrer"
        >
          <Button type="button" size="lg">
            <FcGoogle /> Entre com o Google
          </Button>
        </a>
        <hr className="my-4 w-[280px]" />
        <div>
          <p>
            Ainda não tem cadastro?
            <a href="/signup" rel="noopener noreferrer">
              <Button
                type="button"
                size="lg"
                variant="link"
                className="!px-2 font-bold text-[18px]"
              >
                Cadastre-se
              </Button>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
