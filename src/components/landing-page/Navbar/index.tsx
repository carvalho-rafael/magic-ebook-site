import Image from "next/image";

const MENU_ITEM_STYLE =
  "hover:cursor-pointer transition duration-500 hover:text-theme-2 ml-8";

export default function Navbar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full px-8 lg:pt-4 bg-black">
      <div id="landing-nav-logo" className="[&>img]:my-4">
        <Image
          className="!min-2-[200px] !max-w-auto"
          alt="logo-magic-ebook"
          src="/assets/logo.png"
          width={180}
          height={80}
        />
      </div>
      <div id="landing-nav-menu">
        <ul className="flex list-none !my-2 text-white !p-0">
          <li className={MENU_ITEM_STYLE}>
            <a href="#section-advantages">Benefícios</a>
          </li>
          <li className={MENU_ITEM_STYLE}>
            <a href="#section-fees">Preços</a>
          </li>
          <li className={MENU_ITEM_STYLE}>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
