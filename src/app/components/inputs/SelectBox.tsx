import clsx from "clsx";
import { ChangeEvent } from "react";

type TItem = {
  key: string;
  value: string;
};

interface SelectBoxProps {
  items: TItem[] | string[];
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  additionalClass?: string;
  disabled?: boolean;
  isError?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  items,
  value,
  onChange = () => {},
  additionalClass,
  disabled = false,
  isError = false,
}) => {
  console.log("items", items)
  return (
    <select
      value={value}
      onChange={(e) => onChange(e)}
      className={clsx("custom-input", additionalClass, isError && "error")}
      disabled={disabled}
    >
      {items.map((item) => {
        if (typeof item === "string") {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        }
        return (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};
export default SelectBox;
