import UnderMinatenance from "@/app/ui/components/UnderMinatenance";
import React from "react";
import FileUpload from "./Upload";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="section h-screen flex lg:flex-row flex-col">
      <div className="flex-1">
        <FileUpload />
      </div>
      <div className="bg-slate-100 flex-1">
        <Image src={"/cv.png"} width={500} height={500} alt="logo" />
      </div>
    </div>
  );
}
