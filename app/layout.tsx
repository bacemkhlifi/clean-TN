import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ndhaf Tounes | نظّف تونس",
  description:
    "Kit de nettoyage et challenge citoyen pour rendre la Tunisie plus propre, rue par rue.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Ndhaf Tounes | نظّف قدّام دارك",
    description:
      "Achetez le kit, nettoyez votre quartier, ajoutez vos photos avant/après et gagnez des points.",
    images: ["/clean-tunisia-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
