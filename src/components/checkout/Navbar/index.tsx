import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 lg:py-4 bg-white shadow-md">
      <Link className="[&>img]:my-4" href={"/"}>
        <Image
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={130}
          height={80}
        />
      </Link>
      <div className="px-2 text-center">
        <p>O jeito mais fácil de vender e comprar ebooks na internet!</p>
      </div>
    </div>
  );
}
