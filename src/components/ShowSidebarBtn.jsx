import icon from "../assets/icon-show-sidebar.svg";
import { Button } from "./ui";

export function ShowSidebarBtn() {
  return (
    <Button className="absolute bottom-8 left-0 w-14 h-12 flex items-center rounded-e-full rounded-s-none">
      <img src={icon} alt="Show Sidebar Icon" />
    </Button>
  );
}
