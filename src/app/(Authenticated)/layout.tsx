import Loading from "@/components/Loading";
import { Providers } from "../../providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div
        id="loading-container"
        className="justify-center items-center absolute w-screen h-screen bg-accent opacity-75 hidden"
      >
        <Loading />
      </div>
      {children}
    </Providers>
  );
}
