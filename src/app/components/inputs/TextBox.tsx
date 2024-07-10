import clsx from "clsx";
import { ChangeEvent } from "react";

interface TextBoxProps {
  value?: string | number;
  defaultValue?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  additionalClass?: string;
  maxLength?: number;
  readonly?: boolean;
  isError?: boolean;
  min?: number;
  required?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  placeholder = "",
  type = "text",
  value,
  onChange,
  onKeyDown,
  additionalClass,
  maxLength,
  readonly = false,
  isError = false,
  min,
  required,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        maxLength={maxLength}
        type={type}
        className={clsx("custom-input", additionalClass, isError && "error")}
        value={value}
        readOnly={readonly}
        onChange={onChange}
        onKeyDown={onKeyDown}
        min={min}
        required={required}
      />
    </>
  );
};
export default TextBox;
