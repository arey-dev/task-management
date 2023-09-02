/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";
import { NavLink } from "react-router-dom";
import boardIcon from "../../assets/icon-board.svg";

const classes = {
  base: "block text-on-background rounded-full transition ease-in-out duration-300 text-heading-md text-start pl-[3.25rem] py-[0.875rem] focus:outline-none focus:ring-1 focus:ring-primary dark:hover:bg-on-primary hover:visited:text-primary",
  active: "bg-primary text-on-primary dark:hover:",
  pending: "bg-hover-primary text-on-primary",
};

export function Link({ to, title, className }) {
  return (
    <NavLink
      to={to}
      className={twJoin(
        classes.base,
        (isActive, isPending) => {
          isPending ? "pending" : isActive ? "active" : "";
        },
        className
      )}
    >
      <img
        className="inline mr-4 align-text-top"
        src={boardIcon}
        alt="Board Icon"
      />
      {title}
    </NavLink>
  );
}
