import classes from "./style.module.scss";

function FormTitle({ children, ...rest }) {
  return (
    <h1 className={classes.title} {...rest}>
      {children}
    </h1>
  );
}

export default FormTitle;
