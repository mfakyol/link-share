import Head from "next/head";
import PanelView from "@views/PanelView";

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
