import CloseIcon from "@/icons/CloseIcon";
import classes from "./styles.module.scss";

interface AlertProps {
  alert: string;
  type: "error" | "warning" | "info" | "success";
  onClose(): void;
  className?: string;
}

function Alert({ alert, type, onClose, className = "" }: AlertProps) {
  return alert ? (
    <div className={`${classes.alert} ${classes[type]} ${className}`}>
      <p className={`${classes.text}`}>
        {alert}
      </p>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
    </div>
  ) : null;
}

export default Alert;
