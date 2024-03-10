import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { dashboardCards } from "../data/dashboarCard";
import DashboardCard from "../ui/pages/dashboard/DashboardCard";
import img1 from "@/public/illustration.png";
import RecentComposer from "../ui/pages/dashboard/RecentComposer";
import RecentAmeliorer from "../ui/pages/dashboard/RecentAmeliorer";
import RecentSaved from "../ui/pages/dashboard/RecentSaved";
import { prisma } from "../helpers/prismaInstance";

type Props = {};

export default async function page({}: Props) {
  const session = await getServerSession(options);

  return (
    <section className="px-3">
      <section className="section">
        <h1 className="">
          Bienvenue{" "}
          <span className="text-primary font-bold text-blue-500">
            {session?.user?.name}
          </span>
        </h1>

        <div className="w-full flex gap-4 flex-wrap mt-4 pb-3">
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} data={card} />
          ))}
        </div>
      </section>

      {/* responsive grid of section block , on for compose recent song, ameliorer recent song and saved song  */}
      <section className="section mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RecentComposer />
          <RecentAmeliorer />
          <RecentSaved />
        </div>
      </section>
    </section>
  );
}
