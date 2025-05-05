import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaCheckCircle, FaThumbsDown } from "react-icons/fa";

export default function SectionCompare() {
  return (
    <div className="flex flex-col w-full px-4 bg-accent">
      <div className="md:w-3/5 m-auto">
        <h2 className="font-normal">É a melhor escolha</h2>
        <div className="flex">
          <div className="w-full lg:w-3/5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Image
                      className="!my-0"
                      alt="logo-magic-ebook"
                      src="/assets/logo.png"
                      width={130}
                      height={60}
                    />
                  </TableHead>
                  <TableHead>Outras Plataformas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaCheckCircle color="green" className="inline mr-2" />
                    Sem mensalidade
                  </TableCell>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaThumbsDown color="red" className="inline mr-2" />
                    Mensalidade a partir de R$19,90
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaCheckCircle color="green" className="inline mr-2" />
                    Fácil de publicar seu ebook
                  </TableCell>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaThumbsDown color="red" className="inline mr-2" />
                    Exige algum conhecimento de TI
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaCheckCircle color="green" className="inline mr-2" />
                    Ilimitado. Publique quantos ebooks quiser
                  </TableCell>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaThumbsDown color="red" className="inline mr-2" />
                    Numero limitado de páginas nos planos básicos
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaCheckCircle color="green" className="inline mr-2" />
                    Receba na hora sem cobrança adicional
                  </TableCell>
                  <TableCell className="gap-2 items-center !text-wrap">
                    <FaThumbsDown color="red" className="inline mr-2" />
                    Taxa para saque e período de resgate
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="hidden lg:block lg:w-2/5 self-center pl-8">
            <Image
              className="!m-0"
              alt="compare"
              src="/assets/compare.png"
              width={9000}
              height={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
