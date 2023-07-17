/* eslint-disable react/prop-types */
import { Input } from "./Input";
import cross from "../../assets/icon-cross.svg";

export function RemovableInput({ onRemove, ...props }) {
  return (
    <div className="flex gap-4 mb-3">
      <Input className="w-full" {...props} />
      <button onClick={onRemove} type="button">
        <img src={cross} alt="Remove icon" />
      </button>
    </div>
  );
}
