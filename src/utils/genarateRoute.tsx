import { Suspense } from "react";
import type { ISidebarItem } from "@/types";
import { PageLoader } from "@/components/shared/PageLoader";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.map((item) => {
    const Component = item.component;

    return {
      path: item.url === "/" ? undefined : item.url.replace(/^\//, ""),
      element: Component ? (
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      ) : null,
    };
  });
};
