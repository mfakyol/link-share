import Head from "next/head";
import LoginView from "@/view/LoginView";
import { useTranslation } from "@/contexts/TranslationContext";

function LoginPage() {
  const [t] = useTranslation();
  return (
    <>
      <Head>
        <title>{t("login_meta_title")}</title>
        <meta name="description" content="login_meta_description"/>
      </Head>
      <LoginView />
    </>
  );
}

export default LoginPage;
