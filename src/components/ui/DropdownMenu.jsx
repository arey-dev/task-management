/* eslint-disable react/prop-types */
import { useState } from "react";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { Link, useParams } from "react-router-dom";
import { twJoin } from "tailwind-merge";

export function DropdownMenu({
  match,
  className,
  component = "Board",
  LinkState,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();

  return (
    <div className="relative flex flex-col justify-center items-center">
      <button
        disabled={match}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 px-4 rounded-full hover:bg-hover-secondary transition ease-in-out duration-300"
      >
        <img className="cursor-pointer" src={ellipsis} alt="menu" />
      </button>
      {isOpen && (
        <div
          className={twJoin(
            "absolute top-full w-48 bg-light-surface p-4 rounded-lg z-50 mt-[1.375rem] shadow-md",
            className
          )}
        >
          <Link
            to={
              params.taskId
                ? `/board/${params.boardId}/task/${params.taskId}/edit-task`
                : `/board/${params.boardId}/edit-board`
            }
            className="block text-body-lg text-on-background mb-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
            state={LinkState}
          >
            Edit {component}
          </Link>
          <Link
            to={
              params.taskId
                ? `/board/${params.boardId}/task/${params.taskId}/delete-board`
                : `/board/${params.boardId}/delete-board`
            }
            className="block text-body-lg text-danger cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Delete {component}
          </Link>
        </div>
      )}
    </div>
  );
}
