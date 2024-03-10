import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import Sidebar from "./Sidebar";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ResponsiveSidebar({ open, setOpen }: props) {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(!open)}
      direction="left"
      style={{
        width: "75%",
        height: "100%",
      }}
    >
      <div>
        <Sidebar />
      </div>
    </Drawer>
  );
}
