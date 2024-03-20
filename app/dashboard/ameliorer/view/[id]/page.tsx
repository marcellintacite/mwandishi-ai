import { prisma } from "@/app/helpers/prismaInstance";
import Image from "next/image";
import React from "react";
import cv from "@/public/cv.png";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id } = params;
  const data = await prisma.prompt.findUnique({
    where: {
      id: id,
    },
  });

  // title **, bold **, list item * , italic * and add break line
  const formatResult = (result: string) => {
    return result
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
    // .replace(/\n/g, "<br />");
  };

  return (
    <section className="section mx-2 w-auto min-h-[70vh] flex flex-col gap-3 lg:flex-row">
      <div className="bg-white p-4 rounded-md shadow-md flex-1">
        <h4 className="text-2xl font-bold mt-2">{data?.category}</h4>
        <p className="text-sm text-gray-600">{data?.type}</p>
        <div className="mt-4">
          <p
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: formatResult(data?.result as string),
            }}
          ></p>
        </div>
      </div>

      <div className="flex justify-center flex-1 items-center bg-slate-100">
        <Image src={cv} alt={data?.prompt as string} className="w-72" />
      </div>
    </section>
  );
}
