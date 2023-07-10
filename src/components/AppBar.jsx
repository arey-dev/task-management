import { Button } from "./ui/Button";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { FlexLayout } from "./FlexLayout";

export function AppBar() {
  const boardName = "Platform Launch";
  return (
    <FlexLayout
      as="nav"
      className="items-center border border-light-lines px-6"
    >
      <h2 className="text-heading-xl">{boardName}</h2>
      <Button variant="primary" size="large" className="mr-6 ml-auto">
        + Add New Task
      </Button>
      <img className="cursor-pointer" src={ellipsis} alt="menu" />
    </FlexLayout>
  );
}
