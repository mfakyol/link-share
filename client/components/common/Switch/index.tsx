import classes from "./styles.module.scss";

interface SwitchProps {
  checked?: boolean;
  onChange?(value: boolean): void;
}

function Switch({ checked = false, onChange }: SwitchProps) {
  return (
    <div className={`${classes.switch} ${checked ? classes.checked : classes.unChecked}`} onClick={onChange?.bind(null, !checked)}>
      <div className={`${classes.bead} ${checked ? classes.checked : classes.unChecked}`}></div>
    </div>
  );
}

export default Switch;
