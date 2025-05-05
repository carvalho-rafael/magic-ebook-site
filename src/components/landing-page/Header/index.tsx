"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Header() {
  return (
    <div className="flex justify-between w-full px-4 lg:px-8 py-2 min-h-[300px] lg:min-h-[600px] bg-black">
      <div className="!my-auto [&>img]:my-2 max-w-full">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 8000,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <h1 className="font-light text-white">
                Comece a vender seus
                <span className="bg-theme-1 px-2 mx-2 text-white font-normal">
                  E-books
                </span>
                de forma fácil e GRÁTIS
              </h1>
              <h3 className="font-light !mt-1 text-white">
                Sem mensalidade. É cobrado apenas comissão em cada venda
              </h3>
            </CarouselItem>
            <CarouselItem>
              <h1 className="font-light text-white">
                Descomplicando seu jeito de vender na internet
              </h1>
              <h3 className="font-light !mt-1 text-white">
                Seus clientes podem pagar com PIX ou cartão
              </h3>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <Button size="lg" variant="secondary">
          <a href="/login">Comece já</a>
        </Button>
        <Button size="lg" className="ml-2">
          <a href="#section-advantages">Conheça os benefícios</a>
        </Button>
      </div>
    </div>
  );
}
