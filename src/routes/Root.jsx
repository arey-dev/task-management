import { Flex } from "../components/Flex";
import { Logo } from "../components/Logo";
import { AppBar } from "../components/AppBar";
import { BoardNav } from "../components/BoardNav";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <Flex className="h-24">
        <Logo />
        <AppBar />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)]">
        <BoardNav />
        <Outlet />
      </Flex>
    </>
  );
}
