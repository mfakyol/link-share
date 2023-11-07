import TextInput from "../TextInput";
import classes from "./styles.module.scss";
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useCallback, useState } from "react";

interface ColorInputProps {
  id?: string | undefined;
  value?: string | undefined;
  onChange?(value: string): void;
}

function ColorInput({ id, value, onChange }: ColorInputProps) {
  const [colorInputValue, setColorInputValue] = useState(value?.toString() || "#ffffff");
  const [textInputValue, setTextInputValue] = useState(value?.toString() || "#ffffff");

  const handleBlur = useCallback(() => {
    if (value != colorInputValue) onChange?.(colorInputValue);
  }, [value, colorInputValue, onChange]);

  const handleChangeColorInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(e.target.value);
    setTextInputValue(e.target.value);
  }, []);

  const handleChangeTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
    if (/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(e.target.value)) {
      setColorInputValue(e.target.value);
    }
  }, []);

  return (
    <div className={classes.field}>
      <div className={classes.colorField} >
        <input id={id} className={classes.colorInput} type="color" value={colorInputValue} onChange={handleChangeColorInput} onBlur={handleBlur} />
        <div className={classes.colorBox} style={{ backgroundColor: colorInputValue }}></div>
      </div>
      <TextInput
        wrapperClassName={classes.textInput}
        value={textInputValue}
        onChange={handleChangeTextInput}
        onBlur={handleBlur}
        placeholder="#FFFFFF or #FFFFFFFF"
      />
    </div>
  );
}

export default ColorInput;
