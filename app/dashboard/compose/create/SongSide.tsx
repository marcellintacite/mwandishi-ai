"use client";

import React, { useEffect } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { usePromptResponseStore } from "@/store/PromptResponseStore";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getRandomSong, songs } from "@/app/data/songs";
import { Prompt } from "@prisma/client";

type Props = {
  data?: Prompt;
};

export default function SongSide({ data }: Props) {
  const currentSong = usePromptResponseStore((state) => state.response);

  const [song, setSong] = React.useState(currentSong || data?.result);
  const [loaded, setLoaded] = React.useState(false);
  console.log("currentSong", currentSong);
  // format the song to be displayed in a better way and not as a string
  // replace \n with <br>
  // take all title that are in ** ** and make them bold
  // take all title that are in _ _ and make them italic
  const formatSong = (song: string) => {
    // make the first letter of the song in uppercase and also the firt title in bold and the second in italic
    return song
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/(?:^|\s)\S/g, (l) => l.toUpperCase());
    // return song
    //   .replace(/\n/g, "<br>")
    //   .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    //   .replace(/_(.*?)_/g, "<em>$1</em>");
  };

  useEffect(() => {
    setSong(currentSong || (data?.result as string));
  }, [currentSong, data]);
  return (
    <div className="flex flex-1 justify-center items-center h-full pb-7 relative section mx-3">
      {/* a place where there qill be a log from lef and wait for user to generate a song an shgow the song */}
      {!song ? (
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" width={250} />
          <h1 className="text-4xl font-bold">Générer une chanson</h1>
          <p className="text-center text-gray-500">
            Créez une chanson en quelques secondes
          </p>
        </div>
      ) : (
        <div className="border h-auto lg:h-full rounded-md w-full overflow-y-auto">
          <header className="flex gap-4 items-center bg-slate-100 sticky top-0">
            <Image src={logo} alt="logo" width={70} />
            <div className="flex flex-col">
              <h2 className="font-bold">Mwandishi AI</h2>
              <p className="text-gray-500 text-sm">Votre assistant musical</p>
            </div>
          </header>
          <div
            className="p-4 overflow-auto"
            dangerouslySetInnerHTML={{
              __html: formatSong(song || (data?.result as string)),
            }}
          ></div>
          {/* make the player fixed on the bottom */}
          <div className="sticky bottom-0 w-full">
            <AudioPlayer
              autoPlay
              // selecting a random song
              src={getRandomSong(songs)}
              onPlay={(e) => console.log("onPlay")}
              // other props here
            />
          </div>
        </div>
      )}
    </div>
  );
}
