import { useEffect } from "react";
import classes from "./style.module.scss";
import CloseIcon from "@components/_commons/CheckStatus/CloseIcon";

function Popup({ show, onBack, onClose, children, title = "" }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className={`${classes.popupOverlay} ${show ? classes.show : ""}`} onClick={() => onClose()}></div>

      <div className={`${classes.popupContainer} ${show ? classes.show : ""}`}>
        <div className={classes.popupHeader}>
          {onBack && <img src="/icons/arrow.svg" alt="" className={classes.arrowIcon} onClick={() => onBack()} />}
          {title}
          <img src="/icons/close.svg" alt="" className={classes.closeIcon} onClick={() => onClose()} />
        </div>
        <div className={classes.popupBody}>{children}</div>
      </div>
    </>
  );
}

export default Popup;
