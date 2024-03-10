import { prisma } from "@/app/helpers/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  console.log("email", email);

  let userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return NextResponse.json(userExist);
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return NextResponse.json(user);
}
