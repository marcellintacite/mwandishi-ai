"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CassetteTape,
  Home,
  LogOut,
  Piano,
  PianoIcon,
  Speaker,
  User,
  icons,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import SideBarItem from "./SideBarItem";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

type Props = {};

export default function Sidebar({}: Props) {
  const [open, setOpen] = useState(false);
  const session = useSession();

  const sidebarMenu = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <Home size={16} />,
      bg: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
    },
    {
      title: "Composer",
      link: "/dashboard/compose",
      icon: <Piano size={16} />,
      bg: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
    },
    {
      title: "Améliorer",
      link: "/dashboard/ameliorer",
      icon: <Speaker size={16} />,
      bg: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
    },
    {
      title: "Morceaux enreigistrés",
      link: "/dashboard/save",
      icon: <CassetteTape size={16} />,
      bg: "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]",
    },
  ];
  return (
    <>
      <aside className="bg-slate-100 min-w-72 h-screen sticky top-0 overflow-y-auto md:block">
        <div className="w-[90%] mx-auto bg-white p-4 mt-2 rounded-md">
          <div className="flex justify-center items-center flex-col">
            <Image src={"/logo.png"} alt="logo" width={80} height={80} />
            <h2 className="text-lg font-extrabold">Mwandishi app</h2>
          </div>
          <div className="flex gap-3 items-center bg-slate-200 p-2 rounded-md mt-2">
            <div>
              <Avatar>
                <AvatarImage src={session.data?.user?.image as string} />
                <AvatarFallback>
                  {session.data?.user?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm lg:text-base">{session.data?.user?.name}</p>
              <p className="text-[10px] lg:text-xs">
                {session.data?.user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto bg-white p-4 mt-2 rounded-md">
          {sidebarMenu.map((item, index) => (
            <SideBarItem data={item} />
          ))}
        </div>

        <div className="w-[90%] mx-auto bg-white p-4 mt-2 rounded-md flex flex-col gap-4">
          <SideBarItem
            data={{
              title: "Mon compte",
              link: "/dashboard/account",
              icon: <User />,
            }}
          />
          <Button className="flex gap-2" onClick={() => signOut()}>
            <LogOut size={16} /> <span>Se déconnecter</span>
          </Button>
        </div>
        <footer className="sr-only">
          <p className="text-sm text-center">
            © 2022 Mwandishi. All rights reserved.
          </p>
        </footer>
      </aside>
    </>
  );
}
