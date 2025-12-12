import { useSelector } from "react-redux";
import {
  selectAuthReady,
  selectIsAuthenticated,
} from "../../features/auth/authSelector";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const authReady = useSelector(selectAuthReady);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // wait for checkAuth to finish
  if (!authReady) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // refresh failed → user not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
