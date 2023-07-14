import { Input } from "./Input";
import cross from "../../assets/icon-cross.svg";

export function RemovableInput(props) {
  return (
    <div className="flex gap-4 mb-3">
      <Input className="w-full" {...props} />
      <button type="button">
        <img src={cross} alt="Remove icon" />
      </button>
    </div>
  );
}
