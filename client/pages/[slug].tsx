import Head from "next/head";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import WallPageView from "@/view/WallPageView";
import { parse as cookieParser } from "cookie";
import pageSettingService from "@/services/pageSettingService";
import SensitiveContentWarning from "@/components/wall/SensitiveContentWarning";
import analysisService from "@/services/analysisService";

interface WallPageProps {
  pageSetting: PageSetting;
  showSensitiveWarning: boolean;
  meta: {
    title: string;
    description: string;
    themeColor: string;
  };
}

function WallPage({ pageSetting, showSensitiveWarning, meta }: WallPageProps) {
  const [hideContent, setHideContent] = useState(showSensitiveWarning);

  useEffect(() => {
    analysisService.pageLoadedEvent(pageSetting.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {(meta.themeColor || hideContent) && <meta name="theme-color" content={hideContent ? "#04e181" : meta.themeColor} />}
      </Head>
      <WallPageView pageSetting={pageSetting} hideContent={hideContent} />
      {hideContent && <SensitiveContentWarning pageSetting={pageSetting} onClose={setHideContent.bind(null, false)} />}
    </>
  );
}

export default WallPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await pageSettingService.getPageSettingByUsername(context.params?.slug as string);

  if (!response.status) {
    return {
      notFound: true,
    };
  }

  const isDasboard = !!context.query.dashboard;

  const pageSetting = response.data;
  let showSensitiveWarning = isDasboard ? false : !!pageSetting.sensitiveContent;

  if (pageSetting.sensitiveContent) {
    try {
      const parsedCookie = cookieParser(context.req.headers.cookie || "");
      const alowwedSensitivePages = Array.from(JSON.parse(parsedCookie.alowwedSensitivePages));
      const allowedPage = alowwedSensitivePages.find((p) => p === pageSetting.username);

      if (allowedPage) showSensitiveWarning = false;
    } catch (error) {}
  }

  const meta: Record<string, string> = {};
  meta.title = `${pageSetting.meta.title || pageSetting.title || pageSetting.username} | Links`;
  meta.description = pageSetting.meta.description || `Links. All about you one place.`;
  meta.themeColor = pageSetting.backgroundType == "fill" || "gradient" ? pageSetting.colors.backgroundColor : "";

  return {
    props: {
      pageSetting,
      meta,
      showSensitiveWarning,
    },
  };
};
