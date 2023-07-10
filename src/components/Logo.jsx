import icon from "../assets/logo-dark.svg";
import { FlexLayout } from "./FlexLayout";

export function Logo() {
  return (
    <FlexLayout
      as="header"
      className="items-center border-b border-l border-light-lines px-8"
    >
      <img src={icon} alt="Kanban Logo" />
      <h1 className="sr-only">Kanban</h1>
    </FlexLayout>
  );
}
