/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";

export function Flex({ children, center, as = "div", className }) {
  const Component = as;
  return (
    <Component
      className={twJoin(
        "flex max-w-[1440px] mx-auto",
        center && "items-center justify-center",
        className
      )}
    >
      {children}
    </Component>
  );
}
