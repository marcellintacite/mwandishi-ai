import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function loading({}: Props) {
  return (
    <section className="section px-3">
      {/* responsive dashboard loading skeleton */}
      <section className="section">
        <h1 className="">
          <Skeleton className="h-8 w-32" />
        </h1>
        <div className="w-full flex gap-4 flex-wrap mt-4 pb-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white p-4 rounded-md shadow-shadow-dark"
            >
              <Skeleton className="h-20 w-full" />
              <div className="flex flex-col gap-4 mt-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-4 rounded-md shadow-shadow-dark"
            >
              <Skeleton className="h-20 w-full" />
              <div className="flex flex-col gap-4 mt-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
