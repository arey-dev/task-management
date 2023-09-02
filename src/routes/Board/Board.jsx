import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import { Flex } from "../../components";
import { CallToAction } from "../../components";
import { Column } from "../../components/board";
import { AddColumnButton } from "../../components/board";

export function Board() {
  const { user } = useOutletContext();
  const { columns, tasks } = useLoaderData();

  return (
    <>
      {columns.length > 0 ? (
        <Flex as="main" className="w-full px-6 pt-6 gap-6 overflow-hidden">
          {columns.map((column) => (
            <Column
              key={column.name}
              columnName={column.name}
              tasks={tasks[column.name]}
            />
          ))}
          <AddColumnButton />
        </Flex>
      ) : (
        <CallToAction />
      )}
      <Outlet context={{ columns, user }} />
    </>
  );
}
