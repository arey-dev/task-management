import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "../hooks";

export function PrivateRoute() {
  const user = useAuthState();

  return user ? <Outlet context={{ user }} /> : <Navigate to="/login" />;
}
