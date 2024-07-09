import clsx from "clsx";
import { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
  position?: "left" | "right";
  size?: number;
}
interface ButtonProps {
  label: string;
  handleOnClick?: () => void;
  type?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "reset"
    | "outline";
    className?: string;
  icon?: IconProps;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  handleOnClick,
  className,
  type = "primary",
  icon,
  disabled,
}) => {
  return (
    <>
      <button
        onClick={handleOnClick}
        className={clsx("custom-button", type, className)}
        disabled={disabled}
      >
        {icon && (icon.position === "left" || !icon.position) ? (
          <icon.icon className="inline-block" size={icon.size || 12} />
        ) : null}
        {label}
        {icon && icon.position === "right" ? (
          <icon.icon className="inline-block " size={icon.size || 12} />
        ) : null}
      </button>
    </>
  );
};
export default Button;
