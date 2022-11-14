/* eslint-disable react/display-name */
import { forwardRef } from "react";
import classes from "./style.module.scss";

const TextArea = forwardRef(({ type = "text", className = "", error = "", ...props }, ref) => {
  return (
    <div className={`${classes.textareaWrapper} ${className}`}>
      <textarea ref={ref} className={`${classes.textarea} ${error ? classes.error : ""}`} type={type} {...props}></textarea>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
});

export default TextArea;
