/* eslint-disable react/prop-types */
import { Button } from "./ui/Button";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { Flex } from "./Flex";
import { Link, useParams } from "react-router-dom";
import { removeDelimiter } from "../utilities";

export function AppBar() {
  // get boardId params from the URL;
  const { boardId } = useParams();

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
      <Link to={`board/${boardId}/add-task`} className="mr-6 ml-auto">
        <Button variant="primary" size="large">
          + Add New Task
        </Button>
      </Link>
      <img className="cursor-pointer" src={ellipsis} alt="menu" />
    </Flex>
  );
}
