/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";
import hide from "../assets/icon-hide-sidebar.svg";

export function HideButton({ className, onHandleClick }) {
  return (
    <button
      onClick={onHandleClick}
      className={twJoin(
        "block text-on-background rounded-full transition ease-in-out duration-300 text-heading-md text-start pl-[3.25rem] py-[0.875rem] focus:outline-none focus:ring-1 focus:ring-primary hover:bg-light-secondary hover:text-on-secondary",
        className
      )}
    >
      <img
        className="inline mr-4 align-text-top"
        src={hide}
        alt="Hide Sidebar Icon"
      />
      Hide Sidebar
    </button>
  );
}
