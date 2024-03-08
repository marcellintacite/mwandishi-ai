import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}
