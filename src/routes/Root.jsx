import { Flex } from "../components/Flex";
import { Logo } from "../components/Logo";
import { AppBar } from "../components/AppBar";
import { BoardNav } from "../components/BoardNav";
import { Outlet } from "react-router-dom";
import data from "../data.json";

export function Root() {
  const { boards } = data;

  return (
    <>
      <Flex className="h-24">
        <Logo />
        <AppBar />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)]">
        <BoardNav boards={boards} />
        <Outlet context={boards} />
      </Flex>
    </>
  );
}
