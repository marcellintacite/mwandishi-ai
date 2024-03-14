import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

import { Toaster } from "@/components/ui/toaster";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mwandishi-ai.vercel.app"),
  title: "Mwandishi AI",
  description: "Votre assistant pour composer de la musique",

  openGraph: {
    images: [
      "https://utfs.io/f/35243263-8547-4aa3-930e-fef2c08dc4ff-mdohhu.jpeg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={nunito.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
