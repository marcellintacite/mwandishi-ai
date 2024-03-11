import FormCreate from "./FormCreate";
import React from "react";
import illu from "@/public/illustration1.png";
import Image from "next/image";
import logo from "@/public/logo.png";
import SongSide from "./SongSide";
import { BreadcrumbWithCustomSeparator } from "@/app/ui/components/BreadCamp";

type Props = {};

export default function page({}: Props) {
  return (
    <section className="section mx-2 w-auto h-fit lg:h-[80vh] pb-7">
      <header className="flex justify-between">
        <h3 className="text-lg font-bold">Ajouter une chanson</h3>
      </header>
      <BreadcrumbWithCustomSeparator />
      {/* un formulaire avec 5 champs et un bouton dont 4 champs en grid et l'autre grand champ category: string,
  theme: string,
  titre: string,
  context?: string */}
      <div className="w-full flex lg:flex-row flex-col h-full gap-3">
        <FormCreate />
        <div className="flex flex-1 justify-center items-center h-full pb-7 relative mt-5 ">
          <div className="flex flex-col items-center justify-center">
            <Image src={logo} alt="logo" width={250} />
            <h1 className="md:text-4xl text-2xl font-bold text-center">
              Générer une chanson
            </h1>
            <p className="text-center text-gray-500">
              Créez une chanson en quelques secondes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
