import { MouseEvent, useCallback } from "react";
import classes from "./styles.module.scss";

type Value = number | string;
export type RadioButtonGroupOption = { value: Value; label: string };

interface RadioButtonGroupProps {
  name: string;
  value?: Value;
  onChange?(value: Value): void;
  options?: Array<RadioButtonGroupOption>;
}

function RadioButtonGroup({ value, name, onChange, options }: RadioButtonGroupProps) {
  const handleChange = useCallback(
    (value: Value, e: MouseEvent) => {
      onChange?.(value);
    },
    [onChange]
  );

  return (
    <div className={classes.radioButtonGroup}>
      {options?.map((option) => (
        <label key={option.value} className={classes.radioButton}>
          <input
            className={classes.radioButtonInput}
            type="radio"
            name={name}
            checked={option.value == value}
            onChange={() => {}}
            onClick={handleChange.bind(null, option.value)}
          />
          <div className={classes.radioButtonContent}>
            <div className={classes.radioButtonCircle}></div>
            {option.label}
          </div>
        </label>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
