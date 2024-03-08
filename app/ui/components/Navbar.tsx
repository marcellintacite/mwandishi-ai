import { Button } from "@/components/ui/button";
import { BookHeadphones } from "lucide-react";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="bg-white flex items-center justify-center h-14 w-full">
      <Button variant={"outline"} size={"icon"}>
        <BookHeadphones />
      </Button>
    </nav>
  );
}
