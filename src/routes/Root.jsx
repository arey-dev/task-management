import { Flex } from "../components/Flex";
import { Logo } from "../components/Logo";
import { AppBar } from "../components/AppBar";
import { BoardNav } from "../components/BoardNav";
import data from "../data.json";
import { Outlet } from "react-router-dom";
import { AddTask } from "./AddTask";

export function Root() {
  const { boards } = data;

  return (
    <>
      <Flex className="h-24">
        <Logo />
        <AppBar boardTitle={boards[0].name} />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)]">
        <BoardNav boards={boards} />
        <Outlet context={boards[0]} />
      </Flex>
      <AddTask />
    </>
  );
}
