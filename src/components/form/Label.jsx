/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";

export function Label({ id, className, children }) {
  return (
    <label
      className={twJoin(
        "block mb-2 text-body-md text-on-background",
        className
      )}
      htmlFor={id}
    >
      {children}
    </label>
  );
}
