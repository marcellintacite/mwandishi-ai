import Link from "next/link";
import React from "react";

type Props = {
  data: {
    title: string;
    link: string;
    icon: string;
    bg?: string;
  };
};

export default function SideBarItem({ data }: Props) {
  return (
    <div className="w-full">
      <Link
        href={data.link}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 hover:translate-x-2 transition-all"
      >
        <div
          className={`flex justify-center items-center ${data.bg} p-2 rounded-md`}
        >
          {data.icon}
        </div>
        <span className="flex-1 ml-3 whitespace-nowrap">{data.title}</span>
      </Link>
    </div>
  );
}
