import { prisma } from "@/app/helpers/prismaInstance";
import { FileSpreadsheet } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function RecentAmeliorer({}: Props) {
  const session = await getServerSession();
  const threeFirstPromp = await prisma.prompt.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
      type: "cv",
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Cv checker</h2>
        <Link
          href="/dashboard/ameliorer"
          className="text-blue-300 text-sm hover:underline cursor-pointer "
        >
          {" "}
          Voir tous
        </Link>
      </div>

      {threeFirstPromp.length === 0 && (
        <p className="text-sm text-gray-400 mt-4">
          Vous n'avez pas encore utilisé le cv checker
        </p>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {threeFirstPromp.map((prompt) => (
          <Link href={`/dashboard/ameliorer/view/${prompt.id}`} key={prompt.id}>
            <div
              key={prompt.id}
              className="flex justify-between gap-3 items-center shadow-sm p-3 rounded-lg bg-white hover:shadow-shadow-lg transition-all cursor-pointer"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center">
                <FileSpreadsheet size={16} />
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
  );
}
