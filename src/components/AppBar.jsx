import { Button } from "./ui/Button";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { FlexLayout } from "./FlexLayout";

export function AppBar() {
  const boardName = "Platform Launch";
  return (
    <Flex
      as="nav"
      className="w-full items-center border border-light-lines px-6 bg-light-surface"
    >
      <h2 className="text-heading-xl">{boardName}</h2>
      <Button variant="primary" size="large" className="mr-6 ml-auto">
        + Add New Task
      </Button>
      <img className="cursor-pointer" src={ellipsis} alt="menu" />
    </Flex>
  );
}
