import Head from "next/head";
import Agrements from "@views/AgreementsView";

function terms() {
  return (
    <>
      <Head>
        <title>Terms of Use and Privacy Policy | Links</title>
        <meta name="description" content="Terms of Use and Privacy Policy" />
      </Head>

      <Agrements/>
    </>
  );
}

export default terms;
