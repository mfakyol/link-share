import HomeView from "@views/HomeView";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Links</title>
        <meta
          name="description"
          content="Links is an application that usually collects all links for influncers under a single bio link."
        />
      </Head>
      <HomeView />
    </>
  );
}
