import icon from "../assets/logo-dark.svg";
import { Flex } from "./FlexLayout";

export function Logo() {
  return (
    <Flex
      as="header"
      className="bg-light-surface items-center border-b border-l border-light-lines px-8"
    >
      <img src={icon} alt="Kanban Logo" />
      <h1 className="sr-only">Kanban</h1>
    </Flex>
  );
}
