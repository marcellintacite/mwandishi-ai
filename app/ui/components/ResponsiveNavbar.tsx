"use client";

import { Button } from "@/components/ui/button";
import { Award, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ResponsiveSidebar } from "./SidebarResponsive";
import { usePathname } from "next/navigation";
import Number from "./Number";

type Props = {};

export default function ResponsiveNavbar({}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <header className="md:hidden shadow-md shadow-slate-200 h-16 px-3 flex justify-between items-center sticky top-0 mb-2 bg-white z-50">
        <div className="flex gap-2 items-center">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setOpen(!open)}
          >
            <Menu size={16} />
          </Button>
          <Link href={"/"}>
            <Image src={"/logo.png"} width={60} height={60} alt="logo" />
          </Link>
        </div>

        {/* token */}
        <div className="">
          <Number />
        </div>
      </header>

      <ResponsiveSidebar open={open} setOpen={setOpen} />
    </>
  );
}
