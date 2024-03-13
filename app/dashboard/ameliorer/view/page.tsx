import { prisma } from "@/app/helpers/prismaInstance";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function view({}: Props) {
  const session = await getServerSession();
  const data = await prisma.prompt.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
      type: "cv",
    },
    include: {
      user: true,
    },
  });

  console.log(data);
  return (
    <section className="section mx-2 w-auto min-h-[70vh]">
      <header className="flex justify-between">
        <h3 className="text-lg font-bold">Mes CV</h3>
      </header>
      {/* grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((cv) => (
          <div key={cv.id} className="bg-white p-4 rounded-md shadow-md">
            <Link href={`/dashboard/ameliorer/view/${cv.id}`}>
              <div className="flex justify-center bg-slate-100 p-3">
                <Image
                  src={"/cv-b.png"}
                  alt={cv.user.name as string}
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="w-full"
                />
              </div>

              <h4 className="text-lg font-bold mt-2">{cv.category}</h4>
              <p className="text-sm text-gray-600">{cv.type}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
