import LoadingIcon from "@/icons/LoadingIcon";
import classes from "./styles.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: "blue" | "red" | "yellow" | "green" | "";
  loading?: boolean;
}

function Button({ children, color = "", loading = false, disabled = false, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${classes.button} ${loading ? classes.loading : ""} ${color ? classes[color] : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingIcon className={classes.loadingIcon} /> : children}
    </button>
  );
}

export default Button;
