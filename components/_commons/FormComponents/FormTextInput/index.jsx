import classes from "./style.module.scss";

function FormTextInput({
  children,
  type = "text",
  error = "",
  inputWrapperClassName = "",
  inputClassName = "",
  ...rest
}) {
  return (
    <div className={classes.formTextInput}>
      <div className={`${classes.inputWrapper} ${inputWrapperClassName}`}>
        <input type={type} className={`${classes.input} ${error ? classes.error : ""} ${inputClassName}`} {...rest} />
        {children}
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}

export default FormTextInput;
