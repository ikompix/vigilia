import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP Clients",
  description: "ERP interne — centralisation des mails et todo quotidienne.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
