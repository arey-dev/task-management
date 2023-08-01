import { Outlet, useLoaderData } from "react-router-dom";
import { Flex } from "../../components";
import { CallToAction } from "../../components";
import { Column } from "../../components/board";
import { AddColumnButton } from "../../components/board";

export function Board() {
  const { columns, tasks } = useLoaderData();

  return (
    <>
      {columns ? (
        <Flex as="main" className="w-full px-6 pt-6 gap-6 overflow-auto">
          {columns.map((column) => (
            <Column
              key={column.name}
              columnName={column.name}
              tasks={tasks[column.name]}
            />
          ))}
          <AddColumnButton />
          <Outlet />
        </Flex>
      ) : (
        <CallToAction />
      )}
    </>
  );
}
