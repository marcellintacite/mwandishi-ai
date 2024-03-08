// node --version # Should be >= 18
// npm install @google/generative-ai

import { NextRequest, NextResponse } from "next/server";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBbKBXWso4SOdw6BsPg1VVSLk1etuyfG1s";

async function run(
  category: string,
  theme: string,
  titre: string,
  context?: string
) {
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
      text: `Propose les paroles d'une chanson de la catégorie ${category} avec comme theme ${theme} et comme titre ${titre} et surtout il faut ressortir les mots clés : ${context} si tu en as.`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;

  return response.text();
}

export async function POST(req: NextRequest) {
  const { category, theme, titre, context } = await req.json();

  const resultat = await run(category, theme, titre, context);

  return NextResponse.json({
    message: "Success",
    response: resultat,
  });
}
