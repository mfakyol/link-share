import { forwardRef, useCallback } from "react";
import classes from "./style.module.scss";

const Switch = forwardRef(({ className = "", check = false, onChange, disabled, ...rest }, ref) => {
  const handleOnChange = useCallback(
    (e) => {
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <label className={`${classes.switch} ${className} ${disabled ? classes.disabled : ""}`}>
      <input ref={ref} className={classes.checkbox} disabled={disabled} type="checkbox" onChange={handleOnChange} {...rest} />
      <span className={classes.slider}></span>
    </label>
  );
});

Switch.displayName = "Switch";

export default Switch;
