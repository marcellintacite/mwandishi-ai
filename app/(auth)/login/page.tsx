"use client";

import React, { useEffect, useState } from "react";
import illustration from "@/public/logo.png";
import Image from "next/image";
import { Piano } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  console.log(session);
  useEffect(() => {
    if (session.data) {
      redirect("/dashboard");
    }
  }, [session]);
  return (
    <div
      // adding a background image
      className="w-full bg-bg-image bg-cover bg-center bg-no-repeat h-screen relative"
    >
      <div className="absolute w-full bg-[#0005] h-full top-0 right-0 left-0 flex justify-center items-center">
        {/* login form */}

        <section className="bg-white rounded-md w-11/12 mx-auto md:w-96 p-5 min-h-80">
          <div className="w-full flex justify-center items-center">
            <Image src={illustration} alt="logo mwandishi Ai" width={150} />
          </div>
          <h3 className="md:text-center font-extrabold md:text-2xl text-lg">
            Bienvenue chez Mwandishi AI
          </h3>
          <p className="">Votre assistant en composition musicale et en beat</p>

          {/* login using gmail */}
          <div className="w-full flex justify-center items-center mt-3">
            <button
              aria-label="Sign in with Google"
              className="flex items-center gap-3 bg-google-button-blue rounded-full p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-blue-hover"
              onClick={() => {
                signIn("google"), setLoading(true);
              }}
            >
              <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <title>Connectez-vous avec Google</title>
                  <desc>Google G Logo</desc>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-google-logo-blue"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-google-logo-green"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-google-logo-yellow"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-google-logo-red"
                  ></path>
                </svg>
              </div>
              <span className="text-sm text-white tracking-wider">
                Connectez-vous avec Google
              </span>
              {loading && (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin  fill-slate-700"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </div>

          <div className="flex justify-center items-center flex-col mt-5">
            <Piano size={30} color="grey" />
            <span className="italic text-sm text-gray-400">Made by Tacite</span>
          </div>
        </section>
      </div>
    </div>
  );
}
