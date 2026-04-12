import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/GSAPProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equilíbrio Estático de Três Forças",
  description:
    "Determinação de massas desconhecidas a partir do equilíbrio estático — Experimento de mesa de forças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body>
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
