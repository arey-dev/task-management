/* eslint-disable react/prop-types */
import { useState } from "react";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";

export function DropdownMenu({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <button
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
            to="/"
            className="block text-body-lg text-on-background mb-4 cursor-pointer"
          >
            Edit Board
          </Link>
          <Link
            to="/"
            className="block text-body-lg text-danger cursor-pointer"
          >
            Delete Board
          </Link>
        </div>
      )}
    </div>
  );
}
