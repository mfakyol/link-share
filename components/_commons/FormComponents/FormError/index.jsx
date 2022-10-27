import classes from "./style.module.scss";

function FormError({ error, setError }) {
  return (
    error && (
      <p className={classes.error}>
        <span className={classes.errorText}>{error}</span>
        <img className={classes.closeIcon} src="/icons/close.svg" alt="" onClick={() => setError("")} />
      </p>
    )
  );
}

export default FormError;
