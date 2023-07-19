import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Flex } from "../components";
// import { CallToAction } from "../components/CallToAction";
import { Column } from "../components/board";
import { AddColumnButton } from "../components/board";
import { removeDelimiter } from "../utilities";

export function Board() {
  // read data from parent component that is passed from Outlet
  const boards = useOutletContext();

  // get board name from params
  const { boardId } = useParams();

  // find the board that has the same name as the boardId from params
  const [board] = boards.filter(
    (board) => board.name === removeDelimiter(boardId, "-")
  );

  return (
    <Flex as="main" className="w-full px-6 pt-6 gap-6 overflow-auto">
      {board?.columns.map((column) => (
        <Column
          key={column.name}
          columnName={column.name}
          tasks={column.tasks}
        />
      ))}
      <AddColumnButton />
      <Outlet />
      {/* <CallToAction /> */}
    </Flex>
  );
}
