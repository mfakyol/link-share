import classes from "./style.module.scss";

function LinkButton({ href, title, ...rest }) {
  return (
    <a className={classes.link} rel="noopener noreferrer nofollow external" target="_blank" href={href} {...rest}>
      {title}
    </a>
  );
}

export default LinkButton;
