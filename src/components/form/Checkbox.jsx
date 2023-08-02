/* eslint-disable react/prop-types */
import { useId, useState } from "react";
import { twJoin } from "tailwind-merge";
import { useFormContext } from "react-hook-form";

export function Checkbox({ checked, name, label, className, ...props }) {
  const id = useId();
  const { register } = useFormContext();
  const [check, setCheck] = useState(checked);

  return (
    <div
      className={twJoin(
        "flex items-center bg-light-background pl-3 pr-4 rounded gap-4",
        className
      )}
    >
      <input
        onClick={() => setCheck(!check)}
        defaultChecked={checked}
        id={id}
        type="checkbox"
        className="w-4 h-4 text-primary bg-light-surface rounded-sm focus:ring-primary focus:outline-none focus:ring-1"
        {...register(name)}
        {...props}
      />
      <label
        htmlFor={id}
        className={twJoin(
          "w-full py-4 text-body-md",
          check && "text-on-background line-through"
        )}
      >
        {label}
      </label>
    </div>
  );
}
