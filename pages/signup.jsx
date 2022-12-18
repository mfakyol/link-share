import SignUpView from "@views/SignUpView";
import Head from "next/head";

function signup() {
  return (
    <>
      <Head>
        <title>Sing Up | Links</title>
        <meta
          name="description"
          content="Links is an application that usually collects all links for influncers under a single bio link, Log in now"
        />
      </Head>
      <SignUpView />
    </>
  );
}

export default signup;
