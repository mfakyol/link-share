import { createPortal } from "react-dom";
import CloseIcon from "@/icons/CloseIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import classes from "./styles.module.scss";
import { useTranslation } from "@/contexts/TranslationContext";
import { ForwardedRef, KeyboardEvent, MouseEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export type Option = {
  value: number | string;
  label: string;
};

export interface SelectRef {
  getSelected(): Option | undefined | null;
  setError(error: string): void;
}

interface SelectProps {
  id?: string;
  selected?: Option;
  onChange?(selected: Option): void;
  options?: Array<Option>;
  placeholder?: string;
  title?: string;
  defaultValue?: number | string;
}

function Select({ options = [], onChange, placeholder = "", title = "", id, defaultValue = "" }: SelectProps, ref: ForwardedRef<SelectRef>) {
  const [t] = useTranslation();
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [state, setState] = useState({ show: false });
  const [selected, setSelected] = useState<Option>();

  useEffect(() => {
    if (state.show) {
      optionsContainerRef.current?.focus();

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [state.show]);

  useEffect(() => {
    if (!state.show) return;
    if (!selected) return;
    const index = options.findIndex((o) => o.value == selected.value);
    if (index === -1) return;
    const el = optionsContainerRef.current?.querySelector(`[data-index='${index}']`);
    el?.scrollIntoView({ block: "center", inline: "start" });
    // do not add selected and options as deps it must be runs when just open options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.show]);

  useEffect(() => {
    if (!defaultValue) return;
    const defaultSelected = options.find((option) => option.value === defaultValue);
    if (!defaultSelected) return;
    setSelected(defaultSelected);
  }, [defaultValue, options]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getSelected: () => selected,
        setError: (error: string) => setError(error),
      };
    },
    [selected]
  );

  const openOptions = useCallback(() => {
    setState({ show: true  });
  }, []);

  const closeOptions = useCallback(() => {
    setState({ show: true,  });
    setTimeout(() => {
      setState({ show: false,  });
    }, 300);
  }, []);

  const handleClickOption = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const el = e.target as HTMLDivElement;
      const index = el.dataset.index;
      if (index === undefined) return;
      const selected = options[Number(index)];
      if (!selected) return;
      setSelected(selected);
      onChange?.(selected);
      closeOptions();
    },
    [options, closeOptions, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code == "Space" || e.code === "Enter") openOptions();
    },
    [openOptions]
  );

  const handleKeyDownPopup = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.code == "Escape") closeOptions();
    },
    [closeOptions]
  );

  return (
    <>
      <div className={classes.wrapper}>
        <div
          className={`${classes.selectButton} ${selected ? "" : classes.placeholder}  ${error ? classes.error : ""}`}
          tabIndex={0}
          id={id}
          onKeyDown={handleKeyDown}
          onClick={openOptions}
        >
          {selected?.label || placeholder || t("please_select")}
          <ArrowIcon className={classes.arrowIcon} />
        </div>
        {error && <p className={classes.errorText}>{error}</p>}
      </div>
      {state.show &&
        createPortal(
          <div className={classes.optionsPopup} onKeyDown={handleKeyDownPopup}>
            <div className={classes.overlay} onClick={closeOptions}></div>
            <div className={`${classes.optionsContainer}`}>
              <div className={classes.header}>
                {<div className={classes.title}>{title || t("please_select")}</div>}
                <CloseIcon className={classes.closeIcon} onClick={closeOptions} />
              </div>
              <div ref={optionsContainerRef} className={classes.body} onClick={handleClickOption}>
                {options?.map((option, index) => (
                  <div
                    tabIndex={0}
                    key={option.value}
                    className={`${classes.option} ${selected?.value === option.value ? classes.active : ""}`}
                    data-index={index}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default forwardRef(Select);
