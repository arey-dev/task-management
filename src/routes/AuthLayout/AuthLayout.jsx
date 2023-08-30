import { Navigate, Outlet } from "react-router-dom";
import { Flex } from "../../components";
import { useAuthState } from "../../hooks";

export function AuthLayout() {
  const user = useAuthState();

  return (
    <Flex center className="h-screen">
      {user ? <Navigate to="/" /> : <Outlet />}
    </Flex>
  );
}
