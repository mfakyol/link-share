import classes from "./style.module.scss";

function FormButton({ children, className = "", disabled, ...rest }) {
  return <button disabled={disabled} className={`${classes.formButton} ${className} ${disabled ? classes.disabled : ""}`} {...rest}>{children}</button>;
}

export default FormButton;
