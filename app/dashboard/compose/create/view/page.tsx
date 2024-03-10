import React from "react";
import SongSide from "../SongSide";
import Image from "next/image";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex gap-3 lg:flex-row flex-col">
      <SongSide />
      {/* graidnet color */}
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
    </div>
  );
}
