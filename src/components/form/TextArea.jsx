/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";
import { Label } from "./Label";

const classes = {
  base: "flex-1 h-28 appearance-none border w-full py-2 px-4 bg-light-surface text-light-on-surface text-body-lg focus:outline-none focus:ring-1 focus:ring-primary  placeholder-light-on-surface placeholder-opacity-25 border-neutral-1",
  noResize: "resize-none",
  rounded: {
    none: null,
    sm: "rounded-sm",
    base: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
  },
};

export function TextArea(props) {
  const {
    label,
    type = "text",
    className = "",
    rounded = "base",
    noresize,
    ...rest
  } = props;

  const id = useId();

  return (
    <div className={twJoin("relative", className)}>
      {label && <Label id={id}>{label}</Label>}

      <textarea
        id={id}
        type={type}
        className={twJoin([
          classes.base,
          rounded && classes.rounded[rounded],
          noresize && classes.noResize,
        ])}
        {...rest}
      />
    </div>
  );
}
