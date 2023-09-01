import { Flex } from "../../components";
import { Logo } from "../../components";
import { AppBar } from "../../components";
import { BoardNav } from "../../components";
import { ShowSidebarBtn } from "../../components";
import { useState } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";

export function Root() {
  const { user } = useOutletContext();
  const { boardList } = useLoaderData();

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
          <BoardNav boards={boardList} onHideSidebar={handleSidebarToggle} />
        ) : (
          <ShowSidebarBtn onHandleClick={handleSidebarToggle} />
        )}
        <Outlet context={user} />
      </Flex>
    </>
  );
}
