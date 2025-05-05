import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function SectionStep() {
  return (
    <div className="flex flex-col w-full px-4 pb-8 bg-accent">
      <div className="md:w-3/5 m-auto">
        <h2 className="font-normal">Publicando meu primeiro E-book</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>1º Passo</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="!m-0"
                src="/assets/connect.png"
                alt="Cadastre-se e conecte-se"
                width={9000}
                height={100}
              />
            </CardContent>
            <CardFooter>
              <p>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/login`}>
                  Cadastre-se aqui
                </a>{" "}
                e conecte sua conta do Mercado Pago
              </p>
            </CardFooter>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>2º Passo</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="!m-0"
                src="/assets/add-ebook.png"
                alt="Adicione um ebook"
                width={9000}
                height={100}
              />
            </CardContent>
            <CardFooter>
              Adicione um E-book. Basta escolher um título, descrição e subir o
              arquivo PDF.
            </CardFooter>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>3º Passo</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="!m-0"
                src="/assets/share-on-social-media.png"
                alt="Compartilhe nas suas redes sociais"
                width={9000}
                height={100}
              />
            </CardContent>
            <CardFooter>
              Copartilhe o link gerado em suas redes sociais
            </CardFooter>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>4º Passo</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="!m-0"
                src="/assets/payment-approved.png"
                alt="Compartilhe nas suas redes sociais"
                width={9000}
                height={100}
              />
            </CardContent>
            <CardFooter>
              Receba seu dinheiro assim que seus clientes efetuarem a compra
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
