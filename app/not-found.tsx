import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <section className="section h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-center">404</h1>
        <p className="text-center text-gray-500">Page non trouvée</p>
      </div>
    </section>
  );
}
