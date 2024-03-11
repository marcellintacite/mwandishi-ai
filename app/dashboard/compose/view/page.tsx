import { prisma } from "@/app/helpers/prismaInstance";
import { notFound } from "next/navigation";
import React from "react";
import SongSide from "../create/SongSide";
import Image from "next/image";
import { BreadcrumbWithCustomSeparator } from "@/app/ui/components/BreadCamp";
import Action from "./Action";

type Props = {
  searchParams: { id: string };
};

export default async function page({ searchParams: { id } }: Props) {
  const data = await prisma.prompt.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    return notFound();
  }

  return (
    <section className="section md:mx-2 w-auto flex flex-col lg:flex-row">
      <div className="flex-1">
        <div className="p-2 w-full">
          {/* <BreadcrumbWithCustomSeparator /> */}
          <div className="flex items-center justify-end w-full">
            <Action prompt={data} />
          </div>
        </div>
        <SongSide data={data} />
      </div>

      {/* showing recent composition */}
      {/* Showing a create button when there's no song */}

      <div className="bg-gradient-to-r from-violet-200 to-pink-200 flex-1 flex justify-center items-center section mx-3 mb-3 pb-7">
        <Image
          src={"/listen.png"}
          width={550}
          height={550}
          alt="listen"
          //   adding an infinite scale animation to the image
          className="w-4/5 animate-pulse infinite"
        />
      </div>
    </section>
  );
}
