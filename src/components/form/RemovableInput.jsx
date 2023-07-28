/* eslint-disable react/prop-types */
import { Input } from "./Input";
import cross from "../../assets/icon-cross.svg";
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
        <img src={cross} alt="Remove icon" />
      </button>
    </div>
  );
}
