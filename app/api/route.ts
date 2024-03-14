import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(__dirname);
  // make a path to the public/tmp folder , the above arrow give : C:\Users\hp\Desktop\mwandishi-ai\.next\server\app\api
  // format the path to be : C:/Users/hp/desktop/
  const path = __dirname.split("\\").slice(0, -4).join("/") + "/";
  return NextResponse.json({ message: "Hello, World!", path: __dirname });
}
