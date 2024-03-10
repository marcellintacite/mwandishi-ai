import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Piano } from "lucide-react";

type Props = {};

export default function loading({}: Props) {
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

      <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* creating an array of 5 numbers for the skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-white p-4 rounded-md shadow-shadow-dark"
          >
            <Skeleton className="h-20 w-full" />
            <div className="flex flex-col gap-1 mt-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
