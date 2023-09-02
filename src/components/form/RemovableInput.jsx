/* eslint-disable react/prop-types */
import { Input } from "./Input";
import { useFormContext } from "react-hook-form";

export function RemovableInput({ onRemove, ...props }) {
  const { unregister } = useFormContext();
  return (
    <div className="flex gap-4 mb-3">
      <Input className="w-full" {...props} />
      <button
        onClick={() => {
          onRemove();
          unregister(name);
        }}
        type="button"
      >
        <svg
          className=" fill-[#828FA3] hover:fill-danger"
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
