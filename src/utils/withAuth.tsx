// import type { TRole } from "@/const";
// import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Role, type TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    // const { data, isLoading } = useGetMeQuery(undefined);
    // TODO : get user role from redux
    const userRole = Role.customer;
    const isLoading = false;
    if (!isLoading && !userRole) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];
      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
      }
    }

    return <Component />;
  };
};
