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
  name: string,
  recever: string,
  context: string,
  occasion: string
) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  //create user object
  const user = {
    id: 1,
    name: name,
    email: recever,
  };

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
      text: `Tu es LoveWish, ton role est de souhaiter des voeux aux gens qui te demande de les aider : Voici ${name} qui veux avoir un text de souhait à envoyer à ${recever} à l'occadion de ${occasion} mais aussi voic quelques details à prendre en compte ${context}`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response);

  return response.text();
}

export async function POST(req: NextRequest) {
  const { name, recever, context, occasion } = await req.json();

  const resultat = await run(name, recever, context, occasion);

  return NextResponse.json({
    message: "Success",
    response: resultat,
  });
}
