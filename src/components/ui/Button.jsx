/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { twJoin } from "tailwind-merge";

const classes = {
  base: "focus:outline-none transition ease-in-out duration-300 rounded-full cursor-pointer",
  disabled: "opacity-50 !cursor-not-allowed",
  size: {
    small: "py-[0.5rem] px-4 text-body-lg font-bold",
    large: "py-[0.875rem] px-4 text-heading-md",
  },
  variant: {
    primary:
      "bg-primary hover:bg-hover-primary focus:ring-2 focus:ring-primary text-on-primary",
    secondary:
      "bg-light-secondary hover:bg-hover-secondary focus:ring-2 focus:ring-light-secondary text-on-secondary dark:bg-dark-secondary",
    danger:
      "bg-danger hover:bg-hover-danger focus:ring-2 focus:ring-danger text-on-danger",
  },
};

export const Button = forwardRef(function Button(
  {
    children,
    type = "button",
    className,
    variant = "primary",
    size = "small",
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={twJoin(
        classes.base,
        classes.size[size],
        classes.variant[variant],
        disabled && classes.disabled,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
