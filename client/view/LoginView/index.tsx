import Link from "next/link";
import Logo from "@/icons/Logo";
import { useRouter } from "next/router";
import classes from "./styles.module.scss";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import userService from "@/services/userService";
import TextInput, { TextInputRef } from "@/components/common/TextInput";
import { ChangeEventHandler, FormEventHandler, useCallback, useRef, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

function LoginView() {
  const router = useRouter();
  const [t] = useTranslation();

  const usernameInputRef = useRef<TextInputRef>(null);
  const passwordInputRef = useRef<TextInputRef>(null);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const username = e.target.value;
    const userInput = usernameInputRef.current;

    if (username.length == 0) {
      userInput?.setError("username_required");
      setIsUsernameValid(false);
    } else {
      userInput?.setError("");
      setIsUsernameValid(true);
    }
  }, []);

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const password = e.target.value;
    const passwordInput = passwordInputRef.current;

    if (password.length == 0) {
      passwordInput?.setError("password_required");
      setIsPasswordValid(false);
    } else {
      passwordInput?.setError("");
      setIsPasswordValid(true);
    }
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const usernameInput = usernameInputRef.current;
      const passwordInput = passwordInputRef.current;

      const username = usernameInput?.getValue() || "";
      const password = passwordInput?.getValue() || "";

      const response = await userService.login({ username, password });
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
          <h1 className={classes.title}>{t("login_title")}</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Alert alert={error} type="error" onClose={setError.bind(null, "")} />
            <TextInput ref={usernameInputRef} prefix="links/" type="text" placeholder={t("username")} onChange={handleChangeUsername} />
            <TextInput ref={passwordInputRef} type="password" placeholder={t("password")} onChange={handleChangePassword} />
            <Link href="/forgot-password" className={classes.forgotPasswordLink}>
              {t("forgot_password")}
            </Link>
            <Button color="blue" disabled={!(isUsernameValid && isPasswordValid)} loading={loading}>
              {t("login")}
            </Button>
          </form>
          <p className={classes.dontHaveAccount}>
           {t("dont_have_an_account")}{" "}
            <Link href="/signup" className={classes.registerLink}>
             {t("sign_up_now")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginView;
