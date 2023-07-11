/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";
import { NavLink } from "react-router-dom";
import boardIcon from "../../assets/icon-board.svg";

const classes = {
  base: "block text-on-background rounded-full transition ease-in-out duration-300 py-[0.875rem] pl-[3.25rem] text-heading-md text-start focus:outline-none focus:ring-1 focus:ring-primary",
  active: "bg-primary text-on-primary",
  pending: "bg-hover-primary text-on-primary",
};

export function Link({ to, title, status, className }) {
  return (
    <NavLink
      to={to}
      className={twJoin(
        classes.base,
        status?.isActive && classes.active,
        status?.isPending && classes.pending,
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
