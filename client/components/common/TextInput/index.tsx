import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  ForwardedRef,
  useImperativeHandle,
  useCallback,
  FocusEventHandler,
} from "react";
import classes from "./styles.module.scss";
import EyeCloseIcon from "@/icons/EyeCloseIcon";
import EyeOpenIcon from "@/icons/EyeOpenIcon";
import ErrorIcon from "@/icons/ErrorIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import SuccessIcon from "@/icons/SuccessIcon";

export type StatusIcon = "success" | "error" | "loading" | "";

export interface TextInputProps extends  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,"className"> {
  prefix?: string;
  wrapperClassName?: string;
  textInputClassName?: string;
}

export interface TextInputRef {
  getValue(): string;
  setError(error: string): void;
  setStatusIcon(statusIcon: StatusIcon): void;
}

function TextInput(
  { prefix = "", wrapperClassName = "", textInputClassName = "", type = "text", onFocus, onBlur, ...props }: TextInputProps,
  ref: ForwardedRef<TextInputRef>
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusIcon, setStatusIcon] = useState<StatusIcon>("");

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue: () => inputRef.current?.value || "",
        setError: (error: string) => setError(error),
        setStatusIcon: (statusIcon: StatusIcon) => setStatusIcon(statusIcon),
      };
    },
    []
  );

  const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setIsFocus(true);
      onFocus?.(e);
      inputRef.current?.focus();
    },
    [onFocus]
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setIsFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  return (
    <div className={`${classes.wrapper} ${wrapperClassName}`}>
      <div className={`${classes.textInput} ${isFocus ? classes.focus : ""} ${error ? classes.error : ""} ${textInputClassName}`}>
        {prefix && <span className={classes.prefix}>{prefix}</span>}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${classes.input} ${prefix ? classes.withPrefix : ""}`}
          ref={inputRef}
          type={showPassword ? "text" : type}
          autoCapitalize="off"
          {...props}
        />

        {type === "password" && (
          <div className={classes.eyeContainer}>
            {showPassword ? (
              <EyeCloseIcon className={classes.eyeIcon} onClick={setShowPassword.bind(null, false)} />
            ) : (
              <EyeOpenIcon className={classes.eyeIcon} onClick={setShowPassword.bind(null, true)} />
            )}
          </div>
        )}

        {statusIcon && (
          <div className={classes.statusContainer}>
            {statusIcon === "success" && <SuccessIcon className={`${classes.statusIcon} ${classes.successIcon}`} />}
            {statusIcon === "error" && <ErrorIcon className={`${classes.statusIcon} ${classes.errorIcon}`} />}
            {statusIcon === "loading" && <LoadingIcon className={`${classes.statusIcon} ${classes.loadingIcon}`} />}
          </div>
        )}
      </div>
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
}

export default forwardRef(TextInput);
