import { freePromps } from "@/app/data/prompt";
import { prisma } from "@/app/helpers/prismaInstance";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const session = await getServerSession();
  const data = await prisma.prompt.count({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <section className="px-3 section">
      {/* show user information */}
      <h1 className="">
        Bienvenue{" "}
        <span className="text-primary font-bold text-blue-500">
          {session?.user?.name}
        </span>
      </h1>
      {/* show user information */}
      {/* email, username and phot */}
      <div className="w-full flex gap-4 mt-4 pb-3">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Informations</h2>
          <div className="mt-4 w-full flex justify-center items-center">
            <Image
              src={session?.user?.image as string}
              width={100}
              height={100}
              alt="user"
              className="rounded-full"
            />
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex-1">
                <p className="text-sm text-gray-400">Nom</p>
                <p className="text-lg font-bold">{session?.user?.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg font-bold">{session?.user?.email}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Vous avez utilisé{" "}
                <span className="text-primary font-bold">Mwandishi AI</span>{" "}
                {data} fois sur {freePromps} utilisations gratuites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
