/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { Ebook } from "@/@types/ebook";
import { fetcher } from "@/utils/fetcher";

import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  const [ebook, setEbook] = useState<Ebook>();

  const { label } = useParams<{ label: string }>();

  const [qrCodePix, setQrCodePix] = useState<string>();

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);

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

  const onSubmit = useCallback(
    async ({ selectedPaymentMethod, formData }: IPaymentFormData) => {
      console.log(
        selectedPaymentMethod,
        formData,
        firstName.current?.value,
        lastName.current?.value
      );

      let url = "payments/process-payment-pix";

      if (selectedPaymentMethod !== "bank_transfer") {
        url = "payments/process-payment-card";
      }

      const response = await fetcher(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ebook_id: ebook?.id,
          ...formData,
          payer: {
            ...formData.payer,
            first_name: firstName.current?.value,
            last_name: lastName.current?.value,
          },
        }),
      });

      const pixResponse = await response.json();
      if (pixResponse) {
        setQrCodePix(pixResponse?.qrCode);
        console.log(pixResponse);
      }
    },
    [ebook?.id, firstName, lastName]
  );

  if (!ebook) {
    return <p>Loading...</p>;
  }

  return (
    <div className="prose">
      <h1>{ebook?.title}</h1>
      <p>{ebook?.value}</p>
      <div className="[&_*]:h-[50px]  [&_*]:border-2"></div>

      {qrCodePix && (
        <div className="w-[300px] h-[300px] bg-gray-200">
          <img src={`data:image/png;base64,${qrCodePix}`} alt="qrCodePix" />
        </div>
      )}

      <Input ref={firstName} id="firstName" name="first_name" type="text" />
      <Input ref={lastName} id="lastName" name="last_name" type="text" />

      <Payment
        initialization={{
          amount: Number(ebook.value),
        }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            bankTransfer: "all",
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
  );
};

export default Checkout;
