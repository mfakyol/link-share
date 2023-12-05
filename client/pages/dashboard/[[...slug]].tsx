import Head from "next/head";
import dynamic from "next/dynamic";
import { useTranslation } from "@/contexts/TranslationContext";
const DashboardView = dynamic(import("@/view/DasboardView"), { ssr: false });

function DashboardPage() {
  const [t] = useTranslation();

  return (
    <>
      <Head>
        <title>{t("dashboard_meta_title")}</title>
      </Head>
      <DashboardView />
    </>
  );
}

export default DashboardPage;
