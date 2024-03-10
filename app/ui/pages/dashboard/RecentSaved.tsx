import Link from "next/link";
import React from "react";

type Props = {};

export default function RecentSaved({}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Saved Songs</h2>
        <Link
          href="/dashboard/saved"
          className="text-blue-300 text-sm hover:underline cursor-pointer "
        >
          {" "}
          View All
        </Link>
      </div>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quos,
        quia, quae, quod ipsa quibusdam nemo laudantium
      </p>
    </div>
  );
}
