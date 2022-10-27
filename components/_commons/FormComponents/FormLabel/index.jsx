import classes from "./style.module.scss";

function FormLabel({ children, className = "", ...rest }) {
  return (
    <label className={`${classes.label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default FormLabel;
