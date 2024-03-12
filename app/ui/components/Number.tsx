import { freePromps } from "@/app/data/prompt";
import { prisma } from "@/app/helpers/prismaInstance";

import { Guitar } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

export const revalidate = 800;

export default async function Number({}: Props) {
  const session = await getServerSession();
  const prompNumber = await prisma.prompt.count({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },
  });

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
