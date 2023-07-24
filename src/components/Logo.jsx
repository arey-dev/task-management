/* eslint-disable react/prop-types */
import icon from "../assets/logo-dark.svg";
import { Flex } from "./Flex";

export function Logo({ isSidebarOpen }) {
  return (
    <Flex
      as="header"
      className={`bg-light-surface items-center border-b border-l border-light-lines px-8 ${
        isSidebarOpen ? "min-w-[18.75rem] border-b-0" : ""
      }`}
    >
      <img src={icon} alt="Kanban Logo" />
      <h1 className="sr-only">Kanban</h1>
    </Flex>
  );
}
