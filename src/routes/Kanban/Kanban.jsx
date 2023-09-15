import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { Board } from "../../components/board";

export function Kanban() {
  const { columns, boardId } = useLoaderData();

  const params = useParams();

  return (
    <>
      <Board key={params.boardId} boardId={boardId} />
      <Outlet context={{ columns }} />
    </>
  );
}
