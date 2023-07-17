/* eslint-disable react/prop-types */
import { Button } from "./ui/Button";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { Flex } from "./Flex";
import { Link } from "react-router-dom";

export function AppBar({ boardTitle }) {
  return (
    <Flex
      as="nav"
      className="w-full items-center border border-light-lines px-6 bg-light-surface"
    >
      <h2 className="text-heading-xl">{boardTitle}</h2>
      <Link to="board/platform-launch/add-task" className="mr-6 ml-auto">
        <Button variant="primary" size="large">
          + Add New Task
        </Button>
      </Link>
      <img className="cursor-pointer" src={ellipsis} alt="menu" />
    </Flex>
  );
}
