import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function SectionFees() {
  return (
    <div className="flex flex-col w-full px-4 bg-accent">
      <div className="md:w-3/5 m-auto">
        <h2 id="section-fees" className="font-normal">
          Preços
        </h2>
        <p>
          As taxas são aplicadas em cada venda. <b>Não tem mensalidade</b>
        </p>
        <div className="flex justify-center">
          <div className="lg:w-2/5 self-center">
            <Image
              className="!m-0"
              alt="price-tag"
              src="/assets/price-tag.png"
              width={200}
              height={80}
            />
          </div>
          <div className="w-full lg:w-3/5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Método de pagamento</TableHead>
                  <TableHead>Valor cobrado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pix</TableCell>
                  <TableCell className="!text-wrap">R$ 1,99 + 6%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cartão de crédito</TableCell>
                  <TableCell className="!text-wrap">R$ 1,99 + 8%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end my-4">
          <a href="/login">
            <Button size={"lg"} className="bg-theme-2 ml-auto">
              Quero aproveitar!
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
