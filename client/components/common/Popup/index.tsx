import { createPortal } from "react-dom";
import classes from "./styles.module.scss";
import { ForwardedRef, ReactNode, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import CloseIcon from "@/icons/CloseIcon";
import ArrowIcon from "@/icons/ArrowIcon";

interface PopupProps {
  visible: boolean;
  onClose(): void;
  onBack?(): void;
  disableOverlayClose?: boolean;
  children?: ReactNode;
  containerClassName?: string;
  title?: string;
}
export interface PopupRef {
  closePopup?(): void;
}

function Popup(
  { visible, onClose, onBack, disableOverlayClose = false, children, title = "", containerClassName = "" }: PopupProps,
  ref: ForwardedRef<PopupRef>
) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (visible) document.body.style.overflow = "";
    };
  }, [visible]);

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useImperativeHandle(
    ref,
    () => {
      return { closePopup: handleClose };
    },
    [handleClose]
  );

  if (!visible) return;

  return createPortal(
    <div className={classes.popup}>
      <div className={`${classes.overlay} ${show ? classes.show : ""}`} onClick={disableOverlayClose ? undefined : handleClose}></div>
      <div className={`${classes.container}  ${show ? classes.show : ""} ${containerClassName}`}>
        <div className={classes.header}>
          <ArrowIcon className={`${classes.arrowIcon} ${onBack ? "" : classes.hide}`} onClick={onBack} />
          {title && <div className={classes.title}>{title}</div>}
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </div>
        <div className={classes.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default forwardRef(Popup);
