/* eslint-disable react/prop-types */
import { ThemeSwitch } from "./ThemeSwitch";
import { Link } from "./ui/Link";
import { HideButton } from "./HideButton";
import { hypenateString } from "../utilities";

export function BoardNav({ boards }) {
  return (
    <nav className="min-w-[18.75rem] pt-4 pb-8 border-x border-light-lines bg-light-surface flex flex-col">
      <h2 className="text-heading-sm text-on-background ml-8 mb-[1.125rem]">
        All BOARDS ({boards.length})
      </h2>
      <ul className="overflow-hidden py-2">
        {boards.map((board) => {
          const name = hypenateString(board.name);
          return (
            <li key={board.name} className="relative right-6">
              <Link to={`/board/${name}`} title={name} />
            </li>
          );
        })}
        <li className="relative right-6">
          <Link
            to="board/add-board"
            title="+ Create New Board"
            className="text-primary"
          />
        </li>
      </ul>
      <div className="mt-auto flex flex-col gap-2">
        <ThemeSwitch />
        <HideButton className="relative right-6" />
      </div>
    </nav>
  );
}
