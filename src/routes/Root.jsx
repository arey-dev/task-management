import { Flex } from "../components/Flex";
import { Logo } from "../components/Logo";
import { AppBar } from "../components/AppBar";
import { BoardNav } from "../components/BoardNav";
import { Board } from "./Board";
import data from "../data.json";
// import { Outlet } from "react-router-dom";

export function Root() {

  return (
    <>
      <Flex className="h-24">
        <Logo />
        <AppBar boardTitle={data.boards[0].name} />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)]">
        <BoardNav boards={data.boards}/>
        <Board />
      </Flex>
    </>
  );
}
