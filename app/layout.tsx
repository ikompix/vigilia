import type { Metadata } from "next";

import "./globals.css";
import { siteUrl } from "./site-config";

const defaultTitle = "Vigilia";
const defaultDescription =
  "Surveillance d'entreprises francaises pour PME avec alertes BODACC, justice, comptes annuels et analyse IA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Vigilia",
  },
  description: defaultDescription,
  applicationName: "Vigilia",
  keywords: [
    "surveillance entreprise",
    "surveillance fournisseurs",
    "alertes BODACC",
    "sante financiere entreprise",
    "veille entreprise france",
    "risque fournisseur",
    "monitoring entreprise",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Vigilia",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vigilia, surveillance d'entreprise avec alertes IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/twitter-image"],
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
