import classes from "./style.module.scss";

function Card({ children, title = "" }) {
  return (
    <div className={classes.card}>
      {title && <h2 className={classes.title}>{title}</h2>}
      <div className={classes.body}>{children}</div>
    </div>
  );
}

export default Card;
