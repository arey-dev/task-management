import { Outlet } from "react-router-dom";
import { Flex } from "../components";

export function AuthLayout() {
  return (
    <Flex center className="h-screen">
      <Outlet />
    </Flex>
  );
}
