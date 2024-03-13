import { prisma } from "@/app/helpers/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  const prompNumber = await prisma.prompt.count({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },
  });

  if (!session?.user) {
    return NextResponse.redirect("/login");
  }

  //   if there is an error, it will be caught by the error handler

  console.log(prompNumber);

  return NextResponse.json({
    data: {
      prompNumber,
    },
  });
}
