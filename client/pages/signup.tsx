import { useTranslation } from "@/contexts/TranslationContext";
import SignupView from "@/view/SignupView";
import Head from "next/head";

function SignupPage() {
  const [t] = useTranslation();

  return (
    <>
      <Head>
        <title>{t("signup_meta_title")}</title>
        <meta name="description" content="signup_meta_description" />
      </Head>
      <SignupView />
    </>
  );
}

export default SignupPage;
