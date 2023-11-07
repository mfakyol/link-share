import classes from "./styles.module.scss";
import { DetailedHTMLProps, LabelHTMLAttributes, MouseEvent, useCallback } from "react";

interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  trigger?: "focus" | "click" | "both";
}

function Label({ children, className, htmlFor, trigger = "focus", onClick, ...props }: LabelProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (!htmlFor) return;
      onClick?.(e);
      if (trigger === "both") {
        document.getElementById(htmlFor)?.["focus"]();
        document.getElementById(htmlFor)?.["click"]();
      } else document.getElementById(htmlFor)?.[trigger]();
    },
    [htmlFor, onClick, trigger]
  );

  return (
    <label className={classes.label} onClick={handleClick} {...props}>
      {children}
    </label>
  );
}

export default Label;
