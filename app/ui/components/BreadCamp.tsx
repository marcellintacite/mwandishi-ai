"use client";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbWithCustomSeparator() {
  const pathname = usePathname();

  // separate with slash and replace '' with home
  const pathnameArray = pathname?.split("/");

  console.log(pathnameArray);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnameArray.map((path) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={path === "" ? "/" : `/${path}`}>
                {path === "" ? "Accueil" : path}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </>
        ))}
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
