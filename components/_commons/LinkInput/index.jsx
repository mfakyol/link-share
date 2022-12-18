import { forwardRef } from "react";
import classes from "./style.module.scss";

const LinkInput = forwardRef(({ wrapperClassName = "", className = "", error, ...rest }, ref) => {
  return (
    <div className={`${classes.linkInputWrapper} ${wrapperClassName}`}>
      <input className={`${classes.linkInput} ${className} ${error ? classes.error : ""}`} ref={ref} {...rest} />
        {error && <span  className={classes.errorTextWrapper}><span className={classes.errorText}>{error}</span></span>}
    </div>
  );
});

LinkInput.displayName = "LinkInput";

export default LinkInput;
