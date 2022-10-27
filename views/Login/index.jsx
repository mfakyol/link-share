import Link from "next/link";
import Router from "next/router";
import Navbar from "@components/Navbar";
import classes from "./style.module.scss";
import { useCallback, useState } from "react";
import { validateEmail } from "@lib/validator";
import Form from "@commons/FormComponents/Form";
import { authService } from "services/auth.service";
import FormTitle from "@commons/FormComponents/FormTitle";
import FormLabel from "@commons/FormComponents/FormLabel";
import FormButton from "@commons/FormComponents/FormButton";
import FormTextInput from "@commons/FormComponents/FormTextInput";
import FormError from "@components/_commons/FormComponents/FormError";
import FormPasswordInput from "@commons/FormComponents/FormPasswordInput";

function LoginView() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await authService.login(email, password);
      if (response.ok) {
        const data = await response.json();
        if (!data.status) {
          setError(data.message);
        } else {
          localStorage.setItem("token", data.token);
          Router.push("/panel");
        }
      }
      console.log(response);
    },
    [email, password]
  );

  const handleEmailOnChange = useCallback((e) => {
    setEmailError("");
    const errorMessage = validateEmail(e.target.value);
    if (errorMessage) setEmailError(errorMessage);
    setEmail(e.target.value);
  }, []);

  const handlePasswordOnChange = useCallback((e) => {
    setPasswordError("");

    if (e.target.value.length == 0) setPasswordError("Please enter password.");
    setPassword(e.target.value);
  }, []);

  return (
    <div className={classes.page}>
      <Navbar hideAuthButtons={true} />
      <Form onSubmit={login}>
        <FormTitle>Create your Links account</FormTitle>
        <FormError error={error} setError={setError} />
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormTextInput id="email" placeholder="Email" onChange={handleEmailOnChange} value={email} error={emailError} />
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormPasswordInput
          id="password"
          placeholder="Password"
          onChange={handlePasswordOnChange}
          value={password}
          error={passwordError}
        />
        <FormButton disabled={!email || emailError || !password || passwordError} className={classes.button}>
          Sign Up
        </FormButton>

        <Link href="/forgotpassword">
          <a className={classes.forgotPassword}>forgot password?</a>
        </Link>

        <p className={classes.registerText}>
          Don’t have an account?{" "}
          <Link href="signup">
            <a>Sign up.</a>
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginView;
