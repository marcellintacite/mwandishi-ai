import React from "react";
import img2 from "@/public/illustration1.png";
import Image from "next/image";

type Props = {};

export default function UnderMinatenance({}: Props) {
  return (
    <div className="section flex justify-center flex-col items-center h-[70vh]">
      <Image
        src={img2}
        alt="illustration"
        width={300}
        height={300}
        className="rounded-full"
      />
      <h1 className="text-4xl font-bold text-center">Partie en cours </h1>
      <p className="text-center text-gray-500">
        Nous sommes en train de faire une mise à jour, revenez plus tard
      </p>
    </div>
  );
}
