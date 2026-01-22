import type { RouteObject } from "react-router";
import { Suspense } from "react";
import { PageLoader } from "@/components/shared/PageLoader";
import type { ISidebarItem } from "@/types";

const cleanPath = (p: string) => p.replace(/^\/+/, "").replace(/\/+$/, "");

export function generateRoutes(items: ISidebarItem[]): RouteObject[] {
  return items.map<RouteObject>((item) => {
    const Component = item.component;

    const path =
      item.url === "/"
        ? undefined
        : item.url.startsWith("/")
          ? cleanPath(item.url)
          : item.url;

    return {
      path,
      element: Component ? (
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      ) : undefined,
      children: item.children ? generateRoutes(item.children) : undefined,
    };
  });
}
