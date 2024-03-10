"use server";

import { prisma } from "../helpers/prismaInstance";
import { getServerSession } from "next-auth";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBbKBXWso4SOdw6BsPg1VVSLk1etuyfG1s";
export const GenerateSong = async (formdata: FormData) => {
  // getting category,title,context,rhythm from the formdata
  const category = formdata.get("category");
  const title = formdata.get("title");
  const context = formdata.get("context");
  const rhythm = formdata.get("rhythm");

  const session = await getServerSession();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
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
      text: `Propose les paroles d'une chanson de la catégorie ${category} ayant comme titre ${title} et surtout il faut ressortir les mots clés en partant ce context : ${context} si tu en as, aussi tu peux choisir le rythme de la chanson ${rhythm}. Commence avec le titre puis tu proposes les paroles de la chanson. Donne seulement 3 couplets, bridge et un refrain.`,
    },
  ];

  const userIdInDatabase = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  let result;
  try {
    result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  } catch (error) {
    console.log(error);
    return "Une erreur s'est produite lors de la génération de la chanson";
  }

  const response = result.response;

  //   adding this prompt response in the dabaase
  const record = await prisma.prompt.create({
    data: {
      userId: userIdInDatabase?.id as string,
      category: category as string,
      prompt: parts[0].text,
      rythm: rhythm as string,
      result: response.text(),
      type: "compose",
    },
  });

  return response.text();

  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log("Generated song:", data);
  //   } else {
  //     console.error("Failed to generate song.");
  //   }
};
