/* eslint-disable react/display-name */
import { forwardRef } from "react";
import classes from "./style.module.scss";

const Input = forwardRef(({ type = "text", className = "", error = "", ...props }, ref) => {
  return (
    <div className={`${classes.inputWrapper} ${className}`}>
      <input ref={ref} className={`${classes.input} ${error ? classes.error : ""}`} type={type} {...props} />
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
});

export default Input;
