import Link from "next/link";
import React from "react";

type Props = {
  data: {
    link: string;
    title: string;
    icon: React.ReactNode;
    className?: string;
  };
};

export default function DashboardCard({ data }: Props) {
  return (
    <div
      className={`w-72 bg-slate-100 shadow-shadow-dark rounded-md flex-1 p-1 backdrop-blur-2xl min-h-28 relative ${data.className} border-2 border-transparent  transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center h-full">
        <div className="flex items-center p-2 text-2xl font-extrabold  text-gray-700 gap-3">
          {data.title}
          {data.icon}
        </div>

        <div className="h-full flex justify-center items-center w-full ">
          <p className="text-3xl font-extrabold text-gray-700">90</p>
        </div>
        <div className="absolute w-8 h-8 bottom-1 bg-slate-100 flex justify-center items-center rounded-full p-2 mx-2">
          {data.icon}
        </div>
      </div>
    </div>
  );
}
