"use client";

import { ChangeEvent, useState } from "react";
interface SummaryResponse {
  text: string;
}
export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string>("");
  const [showFilePicker, setShowFilePicker] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    await handleExtractText(newFile);
  };

  const handleExtractText = async (pdfFile: File) => {
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(pdfFile);
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;
      const res = await fetch("/api/extract-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      });

      if (res.ok) {
        const data: SummaryResponse = await res.json();
        console.log("Extracted text:", data.text);
        setPdfText(data.text);
      } else {
        console.error("Failed to extract text from PDF.");
      }
    };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>PDF Sumarizer</h2>

      {/* form */}

      {/* a beautiful upload file */}
      <input type="file" accept="pdf" onChange={(e) => handleFileChange(e)} />
      <div className="output"></div>
    </main>
  );
}
