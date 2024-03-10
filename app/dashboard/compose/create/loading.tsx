import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type Props = {};

export default function loading({}: Props) {
  return (
    <section className="section mx-2">
      <div className="flex justify-center items-center flex-col">
        <Image src={"/logo.png"} width={200} height={200} alt="logo" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </section>
  );
}
