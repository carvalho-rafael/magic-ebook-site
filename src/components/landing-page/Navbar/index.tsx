import Image from "next/image";

const MENU_ITEM_STYLE =
  "hover:cursor-pointer transition duration-500 hover:text-theme-2 ml-8";

export default function Navbar() {
  return (
    <div className="flex justify-between w-full px-8 lg:pt-4 bg-black">
      <div id="landing-nav-logo" className="[&>img]:my-2">
        <Image
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={180}
          height={80}
        />
      </div>
      <div id="landing-nav-menu">
        <ul className="flex list-none !my-2 text-white">
          <li className={MENU_ITEM_STYLE}>
            <a href="#section-advantages">Benefícios</a>
          </li>
          <li className={MENU_ITEM_STYLE}>
            <a href="#section-fees">Preços</a>
          </li>
          <li className={MENU_ITEM_STYLE}>
            <a href="/login">Conheça</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
