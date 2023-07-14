/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";
import { Label } from "./Label";

const classes = {
  base: "flex-1 appearance-none border w-full py-2 px-4 bg-light-surface text-light-on-surface text-body-lg focus:outline-none focus:ring-1focus:ring-primary focus:border-none placeholder-light-on-surface placeholder-opacity-25 border-neutral-1",
  state: {
    error: "border-danger focus:ring-danger",
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

export function Input(props) {
  const {
    label,
    type = "text",
    error = false,
    required = false,
    disabled = false,
    className = "",
    errorText = "",
    rounded = "base",
    ...rest
  } = props;

  const id = useId();

  return (
    <div className={twJoin("relative", className)}>
      {label && (
        <Label id={id}>
          {label} {required && "*"}
        </Label>
      )}
      <input
        id={id}
        type={type}
        className={twJoin([
          classes.base,
          rounded && classes.rounded[rounded],
          error && classes.state.error,
          disabled && classes.state.disabled,
        ])}
        disabled={disabled}
        required={required}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-600">{errorText}</p>}
    </div>
  );
}
