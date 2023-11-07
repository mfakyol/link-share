import {
  DetailedHTMLProps,
  forwardRef,
  useRef,
  useState,
  ForwardedRef,
  useImperativeHandle,
  useCallback,
  FocusEventHandler,
  TextareaHTMLAttributes,
} from "react";
import classes from "./styles.module.scss";

export type StatusIcon = "success" | "error" | "loading" | "";

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  wrapperClassName?: string;
  textAreaClassName?: string;
}

export interface TextAreaRef {
  getValue(): string;
  setError(error: string): void;
}

function TextInput({ wrapperClassName = "", textAreaClassName = "", onFocus, onBlur, ...props }: TextAreaProps, ref: ForwardedRef<TextAreaRef>) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue: () => inputRef.current?.value || "",
        setError: (error: string) => setError(error),
      };
    },
    []
  );

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setIsFocus(true);
      onFocus?.(e);
      inputRef.current?.focus();
    },
    [onFocus]
  );

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setIsFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  return (
    <div className={`${classes.wrapper} ${classes.wrapperClassName}`}>
      <textarea
        className={`${classes.textArea} ${isFocus ? classes.focus : ""} ${error ? classes.error : ""} ${textAreaClassName}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        autoCapitalize="off"
        {...props}
      ></textarea>

      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
}

export default forwardRef(TextInput);
