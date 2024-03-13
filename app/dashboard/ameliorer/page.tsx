import UnderMinatenance from "@/app/ui/components/UnderMinatenance";
import React from "react";
import FileUpload from "./Upload";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/helpers/prismaInstance";
import Link from "next/link";
import cv from "@/public/cv.jpg";
import { freePromps } from "@/app/data/prompt";

type Props = {};

export default async function page({}: Props) {
  const session = await getServerSession();
  const data = await prisma.prompt.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
      type: "cv",
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  const countPrompt = await prisma.prompt.count({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },
  });
  return (
    <div className="section h-screen flex lg:flex-row flex-col overflow-y-auto">
      <div className="flex-1">
        {freePromps - countPrompt <= 0 && (
          <div className="bg-red-100 p-4 rounded-lg shadow-lg">
            <p className="text-red-500 text-lg font-bold">
              Vous avez utilisé tous vos cv checker gratuit
            </p>
            <Link
              href="mailto=tacite.bahiga@gmail.com"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Acheter plus
            </Link>
          </div>
        )}
        {freePromps - countPrompt > 0 && <FileUpload />}

        {/* recents cv */}
        <div className="mt-4">
          <h2 className="text-lg font-bold">Mes CVs</h2>
          {
            // If the user has not used the composer yet
            data.length === 0 && (
              <p className="text-sm text-gray-400 mt-4">
                Vous n'avez pas encore utilisé le cv checker
              </p>
            )
          }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((prompt) => (
              <Link
                href={`/dashboard/ameliorer/view/${prompt.id}`}
                key={prompt.id}
              >
                <div
                  key={prompt.id}
                  className="flex flex-col justify-between gap-3 items-center shadow-sm p-3 rounded-lg bg-white hover:shadow-shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-full p-3 bg-slate-100">
                    <Image src={cv} width={200} height={200} alt="logo" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {
                        // removing ** from the prompt result
                        prompt.category
                      }
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-100 flex-1 h-full justify-center items-center">
        <Image src={"/cv.png"} width={500} height={500} alt="logo" />
      </div>
    </div>
  );
}
