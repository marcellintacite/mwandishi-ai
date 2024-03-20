import { NextRequest, NextResponse } from "next/server"; // To handle the request and response
import { promises as fs } from "fs"; // To save the file temporarily
import { v4 as uuidv4 } from "uuid"; // To generate a unique filename
import PDFParser from "pdf2json"; // To parse the pdf
import { getServerSession } from "next-auth";
import { resumeRevision } from "./resumeRevision";
import { prisma } from "@/app/helpers/prismaInstance";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");
  const work = formData.get("work");
  console.log("Work:", work);
  let fileName = "";
  let parsedText = "";

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];

    // Check if uploadedFile is of type File
    if (uploadedFile instanceof File) {
      // Generate a unique filename
      fileName = uuidv4();

      console.log("Current directory:", __dirname);

      // Convert the uploaded file into a temporary file
      // `C:/Users/hp/Desktop/mwandishi-ai/public/tmp/${fileName}.pdf`; use thi on dev
      // const tempFilePath =
      //   process.env.NODE_ENV === "development"
      //     ? `C:/Users/hp/Desktop/mwandishi-ai/public/tmp/${fileName}.pdf`
      //     : `/tmp/${fileName}.pdf`;
      // tempFile should use the all path in the remote dir on vercel as we do for windows
      const tempFilePath =
        process.env.NODE_ENV === "development"
          ? `C:/Users/hp/Desktop/mwandishi-ai/public/tmp/${fileName}.pdf`
          : `${process.cwd()}/${fileName}.pdf`;

      // Convert ArrayBuffer to Buffer
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      // Save the buffer as a file
      await fs.writeFile(tempFilePath, fileBuffer);

      // Parse the pdf using pdf2json. See pdf2json docs for more info.

      // The reason I am bypassing type checks is because
      // the default type definitions for pdf2json in the npm install
      // do not allow for any constructor arguments.
      // You can either modify the type definitions or bypass the type checks.
      // I chose to bypass the type checks.
      const pdfParser = new (PDFParser as any)(null, 1);

      // See pdf2json docs for more info on how the below works.
      pdfParser.on("pdfParser_dataError", (errData: any) =>
        console.log(errData.parserError)
      );

      pdfParser.on("pdfParser_dataReady", async () => {
        // console.log((pdfParser as any).getRawTextContent());
        parsedText = (pdfParser as any).getRawTextContent();
        await resumeRevision(parsedText, work as string);

        // Delete the temporary file
        await fs.unlink(tempFilePath as string);
      });

      pdfParser.loadPDF(tempFilePath);
    } else {
      console.log("Uploaded file is not in the expected format.");
    }
  } else {
    console.log("No files found.");
  }

  console.log("Parsed text:", parsedText);

  const response = new NextResponse(parsedText, { status: 200 });
  response.headers.set("FileName", fileName);
  return response;
}

export async function GET(req: NextRequest) {
  // get last added cv
  const lastCv = await prisma.prompt.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (lastCv) {
    return NextResponse.json(lastCv);
  }

  return NextResponse.json({});
}
