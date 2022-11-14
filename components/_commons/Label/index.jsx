import classes from "./style.module.scss";

function Label({ children, className = "", ...props }) {
  return (
    <label className={`${classes.label} ${className}`} {...props}>
      {children}
    </label>
  );
}

export default Label;
