import PanelView from "@views/PanelView";
import Head from "next/head";
import React from "react";

function PanelPage() {
  return (
    <>
      <Head>
        <title>Panel | Links</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <PanelView />
    </>
  );
}

export default PanelPage;
