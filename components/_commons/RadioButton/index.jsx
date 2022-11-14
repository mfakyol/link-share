import { useId } from "react";
import classes from "./style.module.scss";

function RadioButton({ className = "", label = "", id="", ...rest }) {

  const radioButtonId = useId();

  return (
    <div className={`${classes.radioButtonWrapper} ${className}`}>
      <input id={id || radioButtonId} className={classes.radioButton} type="radio" {...rest} />
      {label && <label htmlFor={id || radioButtonId} className={classes.label}>{label}</label>}
    </div>
  );
}

export default RadioButton;
