"use client";
import { freePromps } from "@/app/data/prompt";

import { Guitar } from "lucide-react";
import { useSession } from "next-auth/react";

import React, { use, useEffect } from "react";

type Props = {};

export default function Number({}: Props) {
  const { data: user, status } = useSession();

  const [prompNumber, setPrompNumber] = React.useState(0);
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/music/prompt")
        .then((res) => res.json())
        .then((data) => {
          setPrompNumber(data.data.prompNumber);
        });
    }
  }, [status]);

  return (
    <nav className="bg-white  items-center justify-center h-14 w-full flex md:hidden">
      <div className="flex">
        <div className="flex items-center gap-2">
          <Guitar size={16} className="text-pink-600" />
          Il vous reste {freePromps - prompNumber} / {freePromps} essaies
        </div>
      </div>
    </nav>
  );
}
