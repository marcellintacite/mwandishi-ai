import { prisma } from "@/app/helpers/prismaInstance";
import { Piano } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const composers = await prisma.prompt.findMany({
    where: { type: "compose" },
  });

  return (
    <section className="section mx-2 w-auto">
      {/* showing recent composition */}
      {/* Showing a create button when there's no song */}
      <header className="flex justify-between">
        <h3 className="text-lg font-bold">Mes compositions</h3>
        <Link
          href="/dashboard/compose/create"
          className="bg-slate-800 text-white p-2 rounded-md"
        >
          <div className="flex items-center gap-2">
            Composer <Piano size={16} />
          </div>
        </Link>
      </header>
      {composers.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500 text-lg font-bold">
            Aucune composition pour le moment
          </p>
        </div>
      ) : (
        <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {composers.map((composer) => (
            <div
              key={composer.id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h3 className="text-lg font-bold">{composer.category}</h3>
              <p className="text-gray-500">{composer.prompt}</p>
              <Link href={`/dashboard/compose/view?id=${composer.id}`}>
                Voir plus
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
