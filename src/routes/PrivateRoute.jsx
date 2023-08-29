import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";

export function PrivateRoute() {
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/login" />;
}
