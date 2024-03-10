import { prisma } from "@/app/helpers/prismaInstance";
import { notFound } from "next/navigation";
import React from "react";
import SongSide from "../create/SongSide";
import Image from "next/image";

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

  console.log(data);
  return (
    <section className="section mx-2 w-auto flex flex-col lg:flex-row">
      <SongSide data={data} />

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
