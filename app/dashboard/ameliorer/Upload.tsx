"use client";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const workRef = React.useRef<HTMLInputElement>(null);
  const [work, setWork] = useState("");
  const router = useRouter();
  return (
    <div className="mx-4">
      <h2 className="text-2xl font-bold">Révision de votre CV</h2>
      <form>
        <div className="pr-4 mt-4">
          <Label htmlFor="work" className="mt-4">
            Travail recherché
          </Label>
          <Input
            id="work"
            name="work"
            required
            ref={workRef}
            onChange={(e) => setWork(e.target.value)}
            type="text"
            placeholder="Développeur web"
            className="w-full"
          />

          {/* <Button className="mt-4 w-full" type="submit">
          Envoyer
        </Button> */}
        </div>

        <p className="mt-4 mb-2">
          Pour une révision de votre CV, veuillez télécharger votre CV
          ci-dessous.
        </p>
        <FilePond
          disabled={work === ""}
          server={{
            url: "/api",
            process: {
              url: "/pdf",
              method: "POST",
              ondata: (formData) => {
                formData.append("work", workRef.current?.value as string);
                return formData;
              },
            },
            fetch: null,
            revert: null,
          }}
          className={"mx-3"}
          onprocessfile={(error, file) => {
            console.log(error, file);
            router.prefetch("/dashboard/ameliorer/view");
            router.push("/dashboard/ameliorer/view");
          }}
        />
      </form>
    </div>
  );
}
