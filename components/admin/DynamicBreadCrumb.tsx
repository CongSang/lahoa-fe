"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/index";
import { Home } from "lucide-react";
import { breadcrumbLabels } from "@/lib/index";

const isDynamicSegment = (segment: string) =>
  /^\d+$/.test(segment) ||
  /^[0-9a-fA-F-]{24,}$/.test(segment);

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !isDynamicSegment(segment));

  return (
    <Breadcrumb className="hidden sm:flex">
      <BreadcrumbList className="gap-2 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/admin"
            className="text-muted-foreground hover:text-foreground"
          >
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.slice(1).map((segment, index) => {
          const href = `/${segments
            .slice(0, index + 2)
            .join("/")}`;

          const isLast =
            index === segments.slice(1).length - 1;

          const label =
            breadcrumbLabels[segment] ||
            segment.replace(/-/g, " ");

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium text-foreground capitalize">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={href}
                    className="text-muted-foreground hover:text-foreground capitalize transition-colors"
                  >
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}