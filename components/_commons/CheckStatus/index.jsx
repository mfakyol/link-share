import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import RefreshIcon from "./RefreshIcon1";
import classes from "./style.module.scss";

function CheckStatus({ status = 0, className = "" }) {
  const selectIcon = (status) => {
    if (status == 1) return <RefreshIcon className={classes.refresh} />;
    if (status == 2) return <CheckIcon className={classes.check} />;
    if (status == 3) return <CloseIcon className={classes.close} />;
  };

  return status == 0 ? "" : <div className={`${classes.checkStatus} ${className}`}>{selectIcon(status)}</div>;
}

export default CheckStatus;
