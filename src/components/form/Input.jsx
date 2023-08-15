/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";
import { Label } from "./Label";
import { useFormContext } from "react-hook-form";

const classes = {
  base: "form-input flex-1 w-full py-2 px-4 bg-light-surface text-light-on-surface text-body-lg placeholder-light-on-surface placeholder-opacity-25 border-neutral-1 focus:ring-primary",
  state: {
    error: "!border-danger focus:!ring-danger",
    disabled: "text-opacity-25 shadow-inner",
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
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const {
    label,
    disabled,
    type = "text",
    className = "",
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
        // disabled
        className={twJoin([
          classes.base,
          rounded && classes.rounded[rounded],
          errors[name] && classes.state.error,
          disabled && classes.state.disabled
        ])}
        disabled={disabled}
        {...register(name, { required: "Can't be empty" })}
        {...rest}
      />
      {errors[name]?.message && (
        <p className="absolute right-4 bottom-2 text-body-lg text-danger">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
