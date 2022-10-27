import { useState } from "react";
import classes from "./style.module.scss";
import FormTextInput from "../FormTextInput";
import EyeClose from "@public/icons/eye-close.svg";
import EyeOpen from "@public/icons/eye-open.svg";

function FormPasswordInput({ className = "", ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormTextInput
      type={showPassword ? "text" : "password"}
      inputWrapperClassName={classes.passwordInputWrapper}
      autoComplete="off"
      {...rest}
    >
      {showPassword ? (
        <EyeOpen viewBox="0 0  32 32" className={classes.eye} onClick={() => setShowPassword(false)} />
      ) : (
        <EyeClose  viewBox="0 0 32 32" className={classes.eye} onClick={() => setShowPassword(true)} />
      )}
    </FormTextInput>
  );
}

export default FormPasswordInput;
