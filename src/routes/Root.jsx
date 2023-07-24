import { Flex } from "../components";
import { Logo } from "../components";
import { AppBar } from "../components";
import { BoardNav } from "../components";
import { ShowSidebarBtn } from "../components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import data from "../data.json";

export function Root() {
  const { boards } = data;

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <>
      <Flex className="h-24">
        <Logo isSidebarOpen={showSidebar} />
        <AppBar />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)] relative border-x border-light-lines">
        {showSidebar ? (
          <BoardNav boards={boards} onHideSidebar={handleSidebarToggle} />
        ) : (
          <ShowSidebarBtn onHandleClick={handleSidebarToggle} />
        )}
        <Outlet context={boards} />
      </Flex>
    </>
  );
}
