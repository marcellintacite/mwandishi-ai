import { prisma } from "@/app/helpers/prismaInstance";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBbKBXWso4SOdw6BsPg1VVSLk1etuyfG1s";
export const resumeRevision = async (resume: string, preferedWork: string) => {
  const session = await getServerSession();
  console.log("Resume:", resume);
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.2,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `Donnez des points à améliorer niveau contenu dans mon CV, avec des exemple, Je cherche un emploi en tant que ${preferedWork} et voici mon cv : ${resume} , est que mon profile rempli le poste .`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;

  //   return response.text();

  // adding the response to the databse
  await prisma.prompt.create({
    data: {
      user: {
        connect: {
          email: session?.user?.email as string,
        },
      },
      prompt: parts[0].text,
      result: response.text(),
      category: preferedWork,
      rythm: "0",
      type: "cv",
      createdAt: new Date(),
    },
  });

  return response.text();
};
