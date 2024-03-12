import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

import { Toaster } from "@/components/ui/toaster";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mwandishi AI",
  description: "Votre assistant pour composer de la musique",
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
