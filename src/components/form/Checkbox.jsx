/* eslint-disable react/prop-types */
import { useId, useState } from "react";
import { twJoin } from "tailwind-merge";
import { useFormContext } from "react-hook-form";

export function Checkbox({
  checked,
  name,
  label,
  className,
  submit,
  onToggle,
  ...props
}) {
  const id = useId();
  const { register } = useFormContext();
  const [check, setCheck] = useState(!!checked);

  return (
    <div
      className={twJoin(
        "flex items-center bg-light-background pl-3 pr-4 rounded gap-4 dark:bg-dark-background hover:bg-primary hover:bg-opacity-25 dark:hover:bg-primary dark:hover:bg-opacity-25",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        onClick={() => {
          setCheck(!check);
          onToggle(name, !check);
          submit();
        }}
        className={`form-input p-1 text-primary border-neutral-1 bg-light-surface rounded-sm focus:outline-none ${
          check ? "dark:bg-primary" : "dark:bg-dark-surface"
        }`}
        {...register(name)}
        {...props}
      />
      <label
        htmlFor={id}
        className={twJoin(
          "w-full py-4 text-body-md dark:text-dark-on-surface",
          check && "text-on-background line-through"
        )}
      >
        {label}
      </label>
    </div>
  );
}
