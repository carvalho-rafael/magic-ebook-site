import { LoadingProvider } from "@/providers/LoadingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
