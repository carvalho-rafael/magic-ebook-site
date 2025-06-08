import { Ebook } from "@/@types/ebook";

import Navbar from "@/components/checkout/Navbar";
import Footer from "@/components/checkout/Footer";
import CheckoutPaymentComponent from "./payment";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const Checkout = async ({ params }: { params: Promise<{ label: string }> }) => {
  const { label } = await params;

  const ebookResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ebooks/checkout/${label}`,
    { cache: "no-store" }
  );

  if (!ebookResponse.ok) {
    return notFound();
  }

  const ebook: Ebook = await ebookResponse.json();

  if (!ebook) {
    return <p></p>;
  }

  return (
    <div className="prose max-w-full">
      {ebook && !ebook.user?.mp_public_key && (
        <div className="w-full bg-red-700 text-white text-3xl p-4 text-center">
          Página ainda indisponível para vendas. Para habilitar conecte-se com o
          Mercado Pago.
        </div>
      )}
      <Navbar />
      <div className="p-4 bg-[url(/assets/bg-pattern.jpg)] min-h-screen">
        <div className="max-w-[600px] m-auto bg-white py-6 shadow">
          <div className="px-4">
            <h2 className="font-normal mt-0">{ebook?.title}</h2>
            <p className="font-normal italic">{ebook?.description}</p>
            <div dangerouslySetInnerHTML={{ __html: ebook.body || "" }}></div>
            <hr />
            <p className="text-lg">Pague com PIX ou cartão</p>
            <p className="mb-0 mt-4 text-2xl text-green-500 border-l-4 pl-2">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(ebook?.value ? Number(ebook.value) : 0)}
            </p>
            <CheckoutPaymentComponent ebook={ebook} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ label: string }>;
}): Promise<Metadata> {
  const { label } = await params;

  const ebookResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ebooks/checkout/${label}`,
    { cache: "no-store" }
  );

  const ebook: Ebook = await ebookResponse.json();

  return {
    title: ebook.title,
  };
}

export default Checkout;
