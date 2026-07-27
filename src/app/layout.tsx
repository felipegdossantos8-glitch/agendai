import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agendai - Sistema para Profissionais de Beleza",
  description: "Agendamento rápido e simples para profissionais autônomas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-100">{children}</body>
    </html>
  );
}
