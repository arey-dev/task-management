import { Link, useParams } from "react-router-dom";

export function AddColumnButton() {
  const { boardId } = useParams();

  return (
    <Link
      className="w-[17.5rem] max-h-[53.3125rem] relative top-[2.45rem] flex justify-center  items-center bg-add-column text-on-background text-2xl rounded-md shrink-0 hover:text-primary transition z-40"
      to={`/board/${boardId}/add-column`}
    >
      + New Column
    </Link>
  );
}
