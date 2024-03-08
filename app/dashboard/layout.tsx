import React, { ReactNode } from "react";
import Sidebar from "../ui/components/Sidebar";
import Navbar from "../ui/components/Navbar";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full bg-slate-100 ">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
