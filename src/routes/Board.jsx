import { useOutletContext } from "react-router-dom";
import { Flex } from "../components/Flex";
// import { CallToAction } from "../components/CallToAction";
import { Column } from "../components/board/Column";

export function Board() {
  const { columns } = useOutletContext();

  return (
    <Flex as="main" className="w-full p-6 gap-6 overflow-auto">
      {columns.map((column) => (
        <Column
          key={column.name}
          columnName={column.name}
          tasks={column.tasks}
        />
      ))}
      {/* <CallToAction /> */}
    </Flex>
  );
}
