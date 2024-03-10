"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      //   adding an animation of opacity to the button when it's pending of the form
      className={`mt-4 w-full ${pending ? "opacity-50" : ""}`}
      disabled={pending}
    >
      Générer les paroles
    </Button>
  );
}
