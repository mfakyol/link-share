"use client";
import Link from "next/link";
import Logo from "@/icons/Logo";
import classes from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import userService from "@/services/userService";
import validateService from "@/services/validateService";
import TextInput, { TextInputRef } from "@/components/common/TextInput";
import { ChangeEventHandler, FormEventHandler, useCallback, useRef, useState } from "react";

function SignupView() {
  const router = useRouter();
  const emailCheckTimeoutRef = useRef<NodeJS.Timeout>();
  const usernameCheckTimeoutRef = useRef<NodeJS.Timeout>();
  const passwordCheckTimeoutRef = useRef<NodeJS.Timeout>();

  const usernameInputRef = useRef<TextInputRef>(null);
  const emailInputRef = useRef<TextInputRef>(null);
  const passwordInputRef = useRef<TextInputRef>(null);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValidValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    clearTimeout(usernameCheckTimeoutRef.current);
    const username = e.target.value;
    const userInput = usernameInputRef.current;
    userInput?.setError("");
    userInput?.setStatusIcon("loading");
    setIsUsernameValid(false);

    usernameCheckTimeoutRef.current = setTimeout(async () => {
      if (username.length < 3) {
        userInput?.setError("min_length_3");
        userInput?.setStatusIcon("error");
      } else {
        userInput?.setStatusIcon("loading");
        const response = await userService.isUsernameExist(username);
        if (!response.status) {
          userInput?.setError(response.message);
          userInput?.setStatusIcon("error");
        } else {
          if (response.isExist) {
            userInput?.setError("username_exist");
            userInput?.setStatusIcon("error");
          } else {
            userInput?.setStatusIcon("success");
            setIsUsernameValid(true);
          }
        }
      }
    }, 500);
  }, []);

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    clearTimeout(emailCheckTimeoutRef.current);
    const email = e.target.value;
    const emailInput = emailInputRef.current;
    emailInput?.setError("");
    emailInput?.setStatusIcon("loading");
    setIsEmailValid(false);

    emailCheckTimeoutRef.current = setTimeout(async () => {
      const emailValidation = validateService.isValidEmail(email);
      if (!emailValidation.isValid) {
        emailInput?.setError(emailValidation.error);
        emailInput?.setStatusIcon("error");
      } else {
        emailInput?.setStatusIcon("loading");
        const response = await userService.isEmailExist(email);
        if (!response.status) {
          emailInput?.setError(response.message);
          emailInput?.setStatusIcon("error");
        } else {
          if (response.isExist) {
            emailInput?.setError("email_exist");
            emailInput?.setStatusIcon("error");
          } else {
            emailInput?.setStatusIcon("success");
            setIsEmailValid(true);
          }
        }
      }
    }, 500);
  }, []);

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    clearTimeout(passwordCheckTimeoutRef.current);
    const password = e.target.value;
    const passwordInput = passwordInputRef.current;
    passwordInput?.setError("");
    setIsPasswordValidValid(false);

    const passwordValidation = validateService.validatePassword(password);
    if (!passwordValidation.isValid) {
      passwordInput?.setError(passwordValidation.error);
      setIsPasswordValidValid(false);
    } else {
      setIsPasswordValidValid(true);
    }
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const usernameInput = usernameInputRef.current;
      const emailInput = emailInputRef.current;
      const passwordInput = passwordInputRef.current;

      const username = usernameInput?.getValue() || "";
      const email = emailInput?.getValue() || "";
      const password = passwordInput?.getValue() || "";

      const response = await userService.register({ username, email, password });
      setLoading(false);
      if (response.status) router.push("/dashboard");
      else setError(response.message);
    },
    [router]
  );

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <Link href="/">
          <Logo width={114} height={38} />
        </Link>
      </header>
      <main className={classes.main}>
        <div className={classes.container}>
          <h1 className={classes.title}>Create your Links account</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Alert alert={error} type="error" onClose={setError.bind(null, "")} />
            <TextInput ref={usernameInputRef} prefix="links/" type="text" placeholder="username" onChange={handleChangeUsername} />
            <TextInput ref={emailInputRef} type="email" placeholder="Email" onChange={handleChangeEmail} />
            <TextInput ref={passwordInputRef} type="password" placeholder="Password" onChange={handleChangePassword} />
            <p className={classes.term}>
              By clicking “Sign Up” button, you agree to the{" "}
              <Link href="/" className={classes.termLink}>
                {" "}
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/" className={classes.termLink}>
                {" "}
                Privacy Policy
              </Link>
              .
            </p>
            <Button color="blue" disabled={!(isUsernameValid && isEmailValid && isPasswordValid)} loading={loading}>
              Sign In
            </Button>
          </form>
          <p className={classes.haveAccount}>
            Already have an account?{" "}
            <Link href="/login" className={classes.loginLink} prefetch={false}>
              Login now.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignupView;
