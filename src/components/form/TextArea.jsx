/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";
import { Label } from "./Label";
import { useFormContext } from "react-hook-form";

const classes = {
  base: "flex-1 h-28 appearance-none border w-full py-2 px-4 bg-light-surface text-light-on-surface text-body-lg focus:outline-none focus:ring-1 focus:ring-primary  placeholder-light-on-surface placeholder-opacity-25 border-neutral-1 dark:bg-dark-surface dark:text-dark-on-surface dark:placeholder-on-background",
  noResize: "resize-none",
  disable: "text-opacity-25",
  rounded: {
    none: null,
    sm: "rounded-sm",
    base: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
  },
};

export function TextArea({ name, ...props }) {
  const { register } = useFormContext();

  const {
    label,
    type = "text",
    className = "",
    rounded = "base",
    noresize,
    disabled,
    ...rest
  } = props;

  const id = useId();

  return (
    <div className={twJoin("relative", className)}>
      {label && (
        <Label className="dark:text-dark-on-surface" id={id}>
          {label}
        </Label>
      )}

      <textarea
        id={id}
        type={type}
        disabled={disabled}
        className={twJoin([
          classes.base,
          rounded && classes.rounded[rounded],
          noresize && classes.noResize,
          disabled && classes.disable,
        ])}
        {...register(name)}
        {...rest}
      />
    </div>
  );
}
