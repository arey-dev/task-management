/* eslint-disable react/prop-types */
import { Button } from "./ui";
import { Flex } from "./Flex";
import { DropdownMenu } from "./ui";
import { removeDelimiter } from "../utilities";
import { Link, useMatch, useParams } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export function AppBar({ boards }) {
  // get boardId params from the URL;
  const { boardId } = useParams();

  const match = useMatch("/");

  let title;
  // remove delimeter if boardId exists from params
  if (boardId) {
    title = removeDelimiter(boardId, "-");
  }

  // used to disable add task button if board has no column
  const board = boards.find((board) => board.name === title);

  return (
    <Flex
      as="nav"
      className="w-full items-center bg-light-surface border border-light-lines px-6 dark:border-dark-lines dark:bg-dark-surface"
    >
      <h2 className="text-heading-xl text-light-on-surface dark:text-dark-on-surface">
        {title}
      </h2>
      <Link
        to={`board/${boardId}/add-task`}
        className="mr-2 ml-auto rounded-full"
      >
        <Button
          variant="primary"
          disabled={match || board.columns.length <= 0 ? true : false}
          size="large"
        >
          + Add New Task
        </Button>
      </Link>
      <DropdownMenu match={match ? true : false} className="right-1/2" />
    </Flex>
  );
}
