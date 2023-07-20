import { Flex } from "../components";
import { Logo } from "../components";
import { AppBar } from "../components";
import { BoardNav } from "../components";
import { ShowSidebarBtn } from "../components";
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
      <Flex className="h-[calc(100vh-6rem)] relative border-x border-light-lines">
        <BoardNav boards={boards} />
        <Outlet context={boards} />
        <ShowSidebarBtn />
      </Flex>
    </>
  );
}
