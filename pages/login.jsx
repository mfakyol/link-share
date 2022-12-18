import LoginView from "@views/LoginView";
import Head from "next/head";

function login() {
  return (
    <>
      <Head>
        <title>Log In | Links</title>
        <meta
          name="description"
          content="Links is an application that usually collects all links for influncers under a single bio link, register now."
        />
      </Head>
      <LoginView />
    </>
  );
}

export default login;
