import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 lg:py-4 bg-white shadow-md">
      <div className="[&>img]:my-4" onClick={() => router.push(`/`)}>
        <Image
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={130}
          height={80}
        />
      </div>
      <div className="px-2 text-center">
        <p>O jeito mais fácil de vender e comprar ebooks na internet!</p>
      </div>
    </div>
  );
}
