/* eslint-disable react/prop-types */
import { useId } from "react";
import { twJoin } from "tailwind-merge";

export function Checkbox({ checked, label, className, ...props }) {
  const id = useId();

  return (
    <div
      className={twJoin(
        "flex items-center bg-light-background pl-3 pr-4 rounded gap-4",
        className
      )}
    >
      <input
        defaultChecked={checked}
        id={id}
        type="checkbox"
        value=""
        name="bordered-checkbox"
        className="w-4 h-4 text-primary bg-light-surface rounded-sm focus:ring-primary focus:outline-none focus:ring-1"
        {...props}
      />
      <label
        htmlFor={id}
        className={twJoin(
          "w-full py-4 text-body-md",
          checked && "text-on-background line-through"
        )}
      >
        {label}
      </label>
    </div>
  );
}
