import { useCallback, useRef, useState } from "react";
import classes from "./style.module.scss";

function ColorInput({ className = "", onChange, value = "#fff", ...props }) {
  const ref = useRef();

  const handleOnChange = useCallback(
    (e) => {
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <div className={`${classes.colorInputWrapper} ${className}`}>
      <span className={classes.color} style={{ backgroundColor: value }}></span>
      <input ref={ref} className={classes.colorInput} type="color" onChange={handleOnChange} value={value} {...props} />
    </div>
  );
}

export default ColorInput;
