import { useLocation, Link } from "react-router";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
interface DynamicBreadcrumbProps {
  customLabel?: string; // Optional prop to show product name instead of ID
}

const DynamicBreadcrumb = ({ customLabel }: DynamicBreadcrumbProps) => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem className="text-gray-500">
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.length > 0 && <BreadcrumbSeparator />}

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // Use customLabel for the last item if it's a dynamic ID
          const label =
            last && customLabel
              ? customLabel
              : value
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
