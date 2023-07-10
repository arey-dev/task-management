/* eslint-disable react/prop-types */
import { twJoin } from "tailwind-merge";

export function FlexLayout({ children, className, as = "div" }) {
  const Component = as;
  return (
    <Component
      className={twJoin("flex w-full max-w-[1440px] mx-auto", className)}
    >
      {children}
    </Component>
  );
}
