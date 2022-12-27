import Head from "next/head";
import { apiUrl } from "config";
import LinkView from "@views/LinkView";
import http from "services/http.service";

function Link({ profileData }) {
  return (
    <>
      <Head>
        <title>{`${profileData?.metaTitle || profileData?.profileTitle} | Links`}</title>
        <meta name="description" content={profileData.metaDescription || profileData.profileDescription || ""} />

        {profileData.styles?.profileFontFamilyUrls?.length > 0 &&
          profileData.styles?.profileFontFamilyUrls.map((fontFamilyUrl, index) => (
            <link key={index} href={fontFamilyUrl} rel="stylesheet" />
          ))}
        {profileData?.analistic?.googleAnalisticId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${profileData?.analistic?.googleAnalisticId}`}
            ></script>

            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${profileData?.analistic?.googleAnalisticId}');
              `,
              }}
            />
          </>
        )}
      </Head>
 
        <LinkView page={profileData} />
   
    </>
  );
}

export default Link;

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  const { page } = context.params;
  try {
    const response = await http.get(`${apiUrl}/page?endPoint=${page}`).then((res) => res.json());
    if (response?.data?.page) return { props: { profileData: response.data.page },  revalidate: 1 };
    else return { notFound: true };
  } catch (error) {
    if (error?.status == 404) return { notFound: true };
    if (error?.status == 500) return { redirect: { destination: "/500" } };
  }
}
