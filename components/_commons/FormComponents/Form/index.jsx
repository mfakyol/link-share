import classes from "./style.module.scss";

function Form({ className = "", children, ...rest }) {
  return (
    <form className={`${classes.form} ${className}`} {...rest}>
      {children}
    </form>
  );
}

export default Form;
