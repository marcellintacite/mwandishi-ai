"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GenerateSong } from "@/app/actions/generateSong";
import { usePromptResponseStore } from "@/store/PromptResponseStore";
import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "./SubmitBtn";
import { useRouter } from "next/navigation";

type Props = {};

export default function FormCreate({}: Props) {
  const { addResponse } = usePromptResponseStore((state) => state);
  const { toast } = useToast();
  const form = React.useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <form
      ref={form}
      className="flex-1 h-full"
      action={(data) =>
        GenerateSong(data).then((res) => {
          addResponse(res);

          toast({
            title: "Chanson générée",
            description: "La chanson a été générée avec succès",
          });
          form.current?.reset();
          router.push("/dashboard/compose/create/view");
        })
      }
    >
      <div className="grid grid-cols-1 shrink gap-4">
        <div className="mt-3">
          <Label htmlFor="category">
            Catégorie <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="category"
            required
            name="category"
            className="w-full p-2"
            placeholder="Amour, Famille, ... "
          />
        </div>

        <div>
          <Label htmlFor="title">
            Titre <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            required
            name="title"
            placeholder="Titre de la chanson (sugestion)"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="context">
            Contexte <span className="text-red-500">*</span>
          </Label>
          <textarea
            required
            id="context"
            name="context"
            placeholder="Vous voulez que la chanson soit une chanson de..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Select pour le rythme */}
      <Label htmlFor="rythme">Rythme</Label>
      <Select name="rhythm">
        <SelectTrigger className="">
          <SelectValue placeholder="Selectionner un rythme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* rythm items: Gospel, R&B, slow, Regae,etc */}
            <SelectLabel>Rythme</SelectLabel>
            <SelectItem value="gospel">Gospel</SelectItem>
            <SelectItem value="Country">Country</SelectItem>
            <SelectItem value="Folk">Folk</SelectItem>
            <SelectItem value="R&B">R&B</SelectItem>
            <SelectItem value="Slow">Slow</SelectItem>
            <SelectItem value="Reggae">Reggae</SelectItem>
            <SelectItem value="Jazz">Jazz</SelectItem>
            <SelectItem value="Blues">Blues</SelectItem>
            <SelectItem value="Pop">Pop</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <SubmitButton />
    </form>
  );
}
