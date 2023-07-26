/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";
import { Label } from "./Label";
import { useFormContext } from "react-hook-form";

const classes = {
  base: "form-input flex-1 w-full py-2 px-4 bg-light-surface text-light-on-surface text-body-lg placeholder-light-on-surface placeholder-opacity-25 border-neutral-1 focus:border-primary",
  state: {
    error: "focus:ring-danger border-danger",
    disabled: "cursor-not-allowed bg-gray-100 shadow-inner text-gray-400",
  },
  rounded: {
    none: null,
    sm: "rounded-sm",
    base: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
  },
};

export function Input({ name, ...props }) {
  const { register } = useFormContext();
  const {
    label,
    type = "text",
    error = false,
    className = "",
    errorText = "",
    rounded = "base",
    ...rest
  } = props;

  const id = useId();

  return (
    <div className={twJoin("relative", className)}>
      {label && (
        <Label id={id} className={props["label-sr-only"] && "sr-only"}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type={type}
        className={twJoin([
          classes.base,
          rounded && classes.rounded[rounded],
          error && classes.state.error,
        ])}
        {...register(name, { required: true })}
        {...rest}
      />
      {error && (
        <p className="absolute right-4 bottom-2 text-body-lg text-danger">
          {errorText}
        </p>
      )}
    </div>
  );
}
