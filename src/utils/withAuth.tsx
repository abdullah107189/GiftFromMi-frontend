import PageLoader from "@/components/shared/PageLoader";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: string) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery("");
    if (isLoading) return <PageLoader />;
    const userRole = data?.role;
    if (!isLoading && !userRole) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];
      if (!allowedRoles.includes(userRole as string)) {
        return <Navigate to="/unauthorized" />;
      }
    }

    return <Component />;
  };
};
