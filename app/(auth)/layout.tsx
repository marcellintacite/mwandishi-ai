import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Connexion | Mwandishi AI",
  description: "Connectez-vous pour accéder à votre compte Mwandishi AI",
};

export default async function layout({ children }: Props) {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}
