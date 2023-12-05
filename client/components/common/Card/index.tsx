import React, { ReactNode } from "react";
import classes from "./styles.module.scss";
import { useTranslation } from "@/contexts/TranslationContext";

interface CardProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

function Card({ title = "", children, className = "" }: CardProps) {
  const [t] = useTranslation();

  return (
    <div className={`${classes.card} ${className}`}>
      {title && <div className={classes.title}>{t(title)}</div>}
      <div className={classes.body}>{children}</div>
    </div>
  );
}

export default Card;
