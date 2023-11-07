import React, { ReactNode } from "react";
import classes from "./styles.module.scss";

interface CardProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

function Card({ title = "", children, className = "" }: CardProps) {
  return (
    <div className={`${classes.card} ${className}`}>
      {title && <div className={classes.title}>{title}</div>}
      <div className={classes.body}>{children}</div>
    </div>
  );
}

export default Card;
