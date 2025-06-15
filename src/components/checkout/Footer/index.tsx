import { FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex flex-col w-full px-4 py-8 items-center [&>p]:mb-0 bg-black text-gray-400 text-lg text-center">
      <a
        href="https://www.instagram.com/magicebook.oficial/"
        className="flex gap-2 items-center"
      >
        <FaInstagram /> magicebook.oficial
      </a>
      <a
        href="mailto:contato@magicebook.com.br"
        className="flex gap-2 items-center"
      >
        <FaEnvelope /> contato@magicebook.com.br
      </a>
      <p className="text-sm">
        <b>
          Magic Ebook | O jeito mais fácil de vender e comprar ebooks na
          internet!
        </b>
      </p>
    </div>
  );
}
