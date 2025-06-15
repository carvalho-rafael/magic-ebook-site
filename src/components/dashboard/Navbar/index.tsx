import Image from "next/image";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaChartLine, FaUser } from "react-icons/fa";

type NavbarProps = {
  user?: {
    name: string;
  };
  logout: () => void;
};

export default function Navbar({ user, logout }: NavbarProps) {
  return (
    <div className="flex justify-between items-center w-full px-4 bg-gray-900 text-white">
      <div className="cursor-pointer" onClick={() => redirect(`/dashboard/`)}>
        <Image
          className="!my-0"
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={120}
          height={80}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Bem vindo, {user?.name.split(" ")?.[0]}! </p>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="ml-2 curson-pointer p-4">
            <FaBars size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span
                className="flex gap-2 w-full"
                onClick={() => redirect(`/dashboard/profile`)}
              >
                <FaUser /> Minha conta
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span
                className="flex gap-2 w-full"
                onClick={() => redirect(`/dashboard/purchases`)}
              >
                <FaChartLine /> Vendas
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="flex gap-2 w-full" onClick={() => logout()}>
                Sair
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
