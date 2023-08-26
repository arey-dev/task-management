import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoute() {
  let auth = false;
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
