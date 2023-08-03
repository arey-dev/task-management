/* eslint-disable react/prop-types */
import { Button } from "./ui";
import { Flex } from "./Flex";
import { DropdownMenu } from "./ui";
import { removeDelimiter } from "../utilities";
import { Link, useMatch, useParams } from "react-router-dom";

export function AppBar() {
  // get boardId params from the URL;
  const { boardId } = useParams();
  const match = useMatch("/");

  let title;
  // remove delimeter if boardId exists from params
  if (boardId) {
    title = removeDelimiter(boardId, "-");
  }

  // TODO: read the :boardId params from previous history stack if possible
  // and assign it to title if boardId doesn't exists

  return (
    <Flex
      as="nav"
      className="w-full items-center border border-light-lines px-6 bg-light-surface"
    >
      <h2 className="text-heading-xl">{title}</h2>
      <Link
        to={`board/${boardId}/add-task`}
        className="mr-2 ml-auto rounded-full"
      >
        <Button variant="primary" disabled={match ? true : false} size="large">
          + Add New Task
        </Button>
      </Link>
      <DropdownMenu match={match ? true : false} className="right-1/2" />
    </Flex>
  );
}
