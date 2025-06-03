/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Ebook } from "@/@types/ebook";
import { fetcher } from "@/utils/fetcher";

import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import Navbar from "@/components/checkout/Navbar";
import Footer from "@/components/checkout/Footer";
import { FaFileArchive } from "react-icons/fa";
import { toast } from "sonner";
import Image from "next/image";

const Checkout = () => {
  const [ebook, setEbook] = useState<Ebook>();

  const { label } = useParams<{ label: string }>();

  const [qrCodePix, setQrCodePix] = useState<string>();
  const [copyPastPix, setCopyPastPix] = useState<string>();
  const [file, setFile] = useState("");
  const pixInterval = useRef<NodeJS.Timeout>(undefined);

  const fetchEbook = useCallback(async (label: string) => {
    try {
      const response = await fetcher(`ebooks/checkout/${label}`, {
        method: "GET",
      });

      const ebookResponse: Ebook = await response.json();
      if (ebookResponse) {
        setEbook(ebookResponse);
      }
    } catch (error) {
      console.log("erro ebook", error);
    }
  }, []);

  useEffect(() => {
    const publicKey = ebook?.user?.mp_public_key;
    if (!publicKey) return;
    (async () => {
      initMercadoPago(publicKey, {
        locale: "pt-BR",
      });
    })();
  }, [ebook]);

  useEffect(() => {
    if (label) {
      fetchEbook(label);
    }
  }, [label, fetchEbook]);

  useEffect(() => {
    return () => {
      clearInterval(pixInterval.current);
    };
  }, []);

  const onSubmit = useCallback(
    async ({ selectedPaymentMethod, formData }: IPaymentFormData) => {
      console.log(selectedPaymentMethod, formData);

      let url = "payments/process-payment-pix";

      if (selectedPaymentMethod !== "bank_transfer") {
        url = "payments/process-payment-card";
      }
      try {
        const response = await fetcher(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ebook_id: ebook?.id,
            ...formData,
          }),
        });

        if (response.status === 409) {
          toast("Pagamento falhou", {
            description: "Por favor, confira os dados do cartão",
            style: { background: "red", color: "white" },
          });
          return;
        }

        if (response.status === 500) {
          toast("Pagamento falhou", {
            description: "Por favor, confira os dados do cartão",
            style: { background: "red", color: "white" },
          });
          return;
        }

        if (response.status === 401) {
          const errorResponse = await response.json();
          toast(errorResponse);
          return;
        }

        if (selectedPaymentMethod === "bank_transfer") {
          const pixResponse = await response.json();

          if (pixResponse && pixResponse.qrCode && pixResponse.paymentCode) {
            setQrCodePix(pixResponse.qrCode);
            setCopyPastPix(pixResponse.copyPast);

            const intervalId = setInterval(async () => {
              console.log("checking pix paid");

              fetcher("payments/check-payment-pix-approved", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  payment_code: pixResponse.paymentCode,
                }),
              })
                .then(async (responseCheck) => {
                  if (responseCheck.status === 200) {
                    const { url } = await responseCheck.json();
                    toast("Arquivo disponível para download", {
                      style: { background: "green", color: "white" },
                    });

                    setFile(url);

                    clearInterval(intervalId);
                  }
                })
                .catch(() => {
                  toast("erro ao capturar pagamento");
                  clearInterval(intervalId);
                });
            }, 5000);
            pixInterval.current = intervalId;
          }
        } else {
          const { url } = await response.json();
          toast("Arquivo disponível para download", {
            style: { background: "green", color: "white" },
          });

          setFile(url);
        }
      } catch (error: any) {
        toast(error.response.data.message);
      }
    },
    [ebook?.id]
  );

  const paymentComponent = useMemo(
    () => (
      <div>
        <Payment
          initialization={{
            amount: Number(ebook?.value),
          }}
          customization={{
            paymentMethods: ebook?.user?.has_pix
              ? {
                  creditCard: "all",
                  bankTransfer: "all",
                }
              : {
                  creditCard: "all",
                },
            visual: {
              defaultPaymentOption: { bankTransferForm: true },
              hideFormTitle: true,
            },
          }}
          onSubmit={onSubmit}
          onReady={() => {
            console.log("Payment brick is ready");
          }}
          onError={(error) => {
            console.error("Payment brick error: ", error);
          }}
        />
      </div>
    ),
    [ebook, onSubmit]
  );

  if (!ebook) {
    return <p>Loading...</p>;
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
      <div className="p-4 bg-[url(/assets/bg-pattern.jpg)]">
        <div className="max-w-[600px] m-auto bg-white py-6 shadow">
          <div className="px-4">
            <h2 className="font-normal mt-0">{ebook?.title}</h2>
            <p className="font-normal italic">{ebook?.description}</p>
            <div dangerouslySetInnerHTML={{ __html: ebook.body }}></div>
            <hr />
            <p className="text-lg">Pague com PIX ou cartão</p>
            <p className="mb-0 mt-4 text-2xl text-green-500 border-l-4 pl-2">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(ebook?.value ? Number(ebook.value) : 0)}
            </p>

            {file && (
              <a
                className="flex justify-center items-center gap-3 border-2 p-2 max-w-[200px] mt-4"
                href={file}
              >
                <p>Baixar Arquivo</p>
                <FaFileArchive size="30" />
              </a>
            )}
          </div>

          {ebook.user?.mp_public_key ? (
            paymentComponent
          ) : (
            <div className="w-full">
              <Image
                className="w-full"
                alt="mock-payments"
                src="/assets/mock-payments.png"
                width={600}
                height={120}
              />
            </div>
          )}

          <div className="px-4">
            {qrCodePix && copyPastPix && (
              <div className="w-full">
                <p className="mt-0">Copie o código ou escaneie o Qrcode</p>
                <div className="flex gap-2">
                  <input
                    value={copyPastPix}
                    name="copyPastPix"
                    id="copyPastPix"
                    className="flex-1 border-2 p-2"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(copyPastPix);
                      toast("copiado", {
                        style: { background: "green", color: "white" },
                      });
                    }}
                  >
                    Copiar
                  </button>
                </div>
                <div className="w-[300px] h-[300px] bg-gray-200 mx-auto">
                  <img
                    className="!my-1"
                    src={`data:image/png;base64,${qrCodePix}`}
                    alt="qrCodePix"
                  />
                </div>
              </div>
            )}

            {file && (
              <a
                className="flex justify-center items-center gap-3 border-2 p-2 max-w-[200px]"
                href={file}
              >
                <p>Baixar Arquivo</p>
                <FaFileArchive size="30" />
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
