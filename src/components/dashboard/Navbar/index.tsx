import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

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
        <a onClick={() => logout()}>
          <Button className="text-white" variant="link" size="lg">
            Sair
          </Button>
        </a>
      </div>
    </div>
  );
}
