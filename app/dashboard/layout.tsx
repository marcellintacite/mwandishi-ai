import React, { ReactNode } from "react";
import Sidebar from "../ui/components/Sidebar";
import Navbar from "../ui/components/Navbar";
import { getServerSession } from "next-auth";
import { prisma } from "../helpers/prismaInstance";
import ResponsiveNavbar from "../ui/components/ResponsiveNavbar";

type Props = {
  children: ReactNode;
};

export default async function layout({ children }: Props) {
  const res = await getServerSession();

  // const userInDatabase = await prisma.user.findUnique({
  //   where: {
  //     email: res?.user?.email as string,
  //   },
  // });

  // if (!userInDatabase) {
  //   await prisma.user.create({
  //     data: {
  //       email: res?.user?.email as string,
  //       name: res?.user?.name as string,
  //     },
  //   });
  // }
  return (
    <>
      <ResponsiveNavbar />
      <main className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full bg-slate-100 ">
          <Navbar />
          {children}
        </div>
      </main>
    </>
  );
}
