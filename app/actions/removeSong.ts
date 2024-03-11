"use server";

import { Prompt } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "../helpers/prismaInstance";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function removePrompt(prompt: Prompt) {
  await prisma.prompt
    .delete({
      where: {
        id: prompt.id,
      },
    })
    .then((res) => {
      revalidatePath("/dashboard/compose");
    })
    .catch((e) => {
      console.log(e);
      return {
        erreur: `Il y a eu erreur ${e}`,
      };
    });

  redirect("/dashboard/compose");
}
