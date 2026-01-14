import { Navigate, useLocation } from "react-router";
import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authLoading, user } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
