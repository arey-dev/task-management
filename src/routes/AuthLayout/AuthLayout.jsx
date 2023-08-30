import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { Flex } from "../../components";

export function AuthLayout() {
  const user = useLoaderData();

  return (
    <Flex center className="h-screen">
      {user ? <Navigate to="/" /> : <Outlet />}
    </Flex>
  );
}
