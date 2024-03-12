import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <section className="bg-slate-800 flex justify-center h-screen">
      <div className="grid max-w-screen-xl px-6 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="flex flex-col items-center justify-center lg:items-start md:hidden">
            <Image
              src={"/logo.png"}
              alt="illustration"
              width={200}
              height={200}
            />
          </div>
          {/* a responsive title with mwandishi AI in linear gradient "Découvrez Mwandishi AI*/}
          <h1 className="text-4xl font-extrabold leading-tight text-slate-200 lg:text-5xl dark:text-gray-100">
            Découvrez
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-200">
              Mwandishi AI
            </span>
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-400 mt-3 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Mwandishi AI est un outil de composition musicale qui vous aide à
            composer des chansons en quelques secondes à l'aide de l'IA. Ne vous
            inquiétez pas si vous n'avez pas de compétences en composition
            musicale, Mwandishi AI est là pour vous aider. Donnez simplement un
            titre ou un context à votre chanson et laissez Mwandishi AI faire le
            reste.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Commencer
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link
            href="mailto:aksantibahiga3@gmail.com"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg focus:ring-4    hover:bg-gray-700 focus:ring-gray-800"
          >
            Contactez nous
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={"/illustration.png"}
            alt="illustration"
            width={500}
            height={500}
            className="rounded-full w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
