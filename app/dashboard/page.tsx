import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { dashboardCards } from "../data/dashboarCard";
import DashboardCard from "../ui/pages/dashboard/DashboardCard";

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

        <div className="w-full flex gap-4 flex-wrap mt-4">
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} data={card} />
          ))}
        </div>
      </section>
    </section>
  );
}
