import { useEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import classes from "./style.module.scss";

function Dropdown({ className = "", selected, setSelected, options = [], ...props }) {
  const dropdownRef = useRef();

  const [dropdownStatus, setDropdownStatus] = useState({ isOpen: false, position: "down" });

  useEffect(() => {
    let event;
    if (dropdownStatus.isOpen) {
      event = (e) => {
        if (e.target?.contains(dropdownRef.current)) {
          handleOnClickSelect();
          document.removeEventListener("click", event);
        }
      };
      document.addEventListener("click", event);
    }
    return () => {
      if (event) document.removeEventListener("click", event);
    };
  }, [dropdownStatus, handleOnClickSelect]);

  const handleOnClickSelect = useCallback(() => {
    setDropdownStatus((prev) => {
      if (prev.isOpen) return { ...prev, isOpen: false };
      const position = window.innerWidth / 2 - dropdownRef.current.getBoundingClientRect().top > 0 ? "down" : "top";
      return { isOpen: true, position };
    });
  }, []);

  const handleOnClickOption = useCallback(
    (option) => {
      setSelected(option);
    },
    [setSelected]
  );

  return (
    <div ref={dropdownRef} onClick={handleOnClickSelect} className={`${classes.dropdown} ${className}`} {...props}>
      <div className={classes.selectedLabel}>{selected?.label || "Please Select"}</div>
      <img src="/icons/down-arrow.svg" alt="" className={classes.arrowIcon} />
      <div
        className={`${classes.options} ${dropdownStatus.isOpen ? classes.open : ""} ${
          dropdownStatus.position == "top" ? classes.topDirection : ""
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`${classes.option} ${option.value == selected?.value ? classes.selected : ""}`}
            onClick={() => handleOnClickOption(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
