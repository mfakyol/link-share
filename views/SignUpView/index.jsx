import Link from "next/link";
import Navbar from "@components/Navbar";
import classes from "./style.module.scss";
import Form from "@commons/FormComponents/Form";
import FormButton from "@commons/FormComponents/FormButton";
import FormLabel from "@commons/FormComponents/FormLabel";
import FormPasswordInput from "@commons/FormComponents/FormPasswordInput";
import FormTextInput from "@commons/FormComponents/FormTextInput";
import FormTitle from "@commons/FormComponents/FormTitle";
import { useCallback, useRef, useState } from "react";
import slugify from "slugify";
import http from "services/http.service";
import CheckStatus from "@components/_commons/CheckStatus";
import { validateEmail, validatePassword } from "@lib/validator";
import { authService } from "services/auth.service";
import Router from "next/router";
import FormError from "@components/_commons/FormComponents/FormError";
import { apiUrl } from "config";

const prefix = "links/";

function SignUpView() {
  const timeoutRef = useRef();
  const controllerRef = useRef();

  const [error, setError] = useState("");

  const [endPoint, setEndPoint] = useState("");
  const [endPointError, setEndPointError] = useState("");
  const [endPointStatus, setEndPointStatus] = useState(0);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEndPointOnChange = useCallback((e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (controllerRef.current) controllerRef.current.abort();

    const endPoint = slugify(e.target.value.slice(prefix.length), { lower: true });
    setEndPoint(endPoint);
    setEndPointError("");
    if (endPoint?.length < 3) {
      setEndPointError("End point must be longer than 3 characters.");
      return setEndPointStatus(0);
    }
    setEndPointStatus(1);
    timeoutRef.current = setTimeout(() => {
      const controller = new AbortController();
      controllerRef.current = controller;
      const signal = controller.signal;

      http
        .get(`${apiUrl}/page/isEndPointExist?endPoint=${endPoint}`, { signal })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            if (res.data.isExist) {
              setEndPointError("This end point is already taken.");
              setEndPointStatus(3);
            } else setEndPointStatus(2);
          } else {
            setEndPointError("Server error please try later.");
            setEndPointStatus(3);
          }
          controllerRef.current = undefined;
        });
    }, 200);
  }, []);

  const handleEmailOnChange = useCallback((e) => {
    setEmailError("");
    const errorMessage = validateEmail(e.target.value);
    if (errorMessage) setEmailError(errorMessage);
    setEmail(e.target.value);
  }, []);

  const handlePasswordOnChange = useCallback((e) => {
    setPasswordError("");
    const errorMessage = validatePassword(e.target.value);
    if (errorMessage) setPasswordError(errorMessage);
    setPassword(e.target.value);
  }, []);

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await authService
        .signup(endPoint, email, password)
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            localStorage.setItem("token", res.token);
            Router.push("/panel");
          } else {
            setError(res.message);
          }
        })
        .catch((e) => {
          setError("unknow error occured.");
        });
    },
    [endPoint, email, password]
  );

  return (
    <div className={classes.page}>
      <Navbar hideAuthButtons={true} />
      <Form onSubmit={handleOnSubmit}>
        <FormTitle>Create your Links account</FormTitle>
        <FormError error={error} setError={setError} />
        <FormLabel htmlFor="endPoint">End Point (always replaceable)</FormLabel>
        <FormTextInput
          spellCheck="false"
          id="endPoint"
          placeholder="links/endpoint"
          onChange={handleEndPointOnChange}
          value={`${prefix}${endPoint}`}
          inputWrapperClassName={classes.endpointInput}
          error={endPointError}
          autoComplete="off"
        >
          <CheckStatus status={endPointStatus} />
        </FormTextInput>
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
        <p className={classes.terms}>
          By clicking “Sign Up” button, you agree to the{" "}
          <Link href="/agreements#termsofuse">
            <a target="_blank">Terms of Use</a>
          </Link>{" "}
          and{" "}
          <Link href="/agreements#privacypolicy">
            <a target="_blank">Privacy Policy.</a>
          </Link>
        </p>

        <FormButton
          disabled={
            !(email && !emailError && password && !passwordError && endPoint && !endPointError && endPoint != 2)
          }
        >
          Sign Up
        </FormButton>

        <p className={classes.loginText}>
          Already have an account?{" "}
          <Link href="login">
            <a>Log in.</a>
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default SignUpView;
