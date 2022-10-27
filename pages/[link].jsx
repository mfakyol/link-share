import Head from "next/head";
import uniqueId from "@lib/uniqueId";
import { cookieParser } from "@lib/cookieParser";
import LinkView from "@views/LinkPage";

function Link({ profileData }) {
  return (
    <>
      <Head>
        <title>{`${profileData?.metaTitle || profileData?.profileTitle} | Links`}</title>
        <meta name="description" content={profileData.metaDescription || profileData.profileDescription || ""} />

        {profileData.styles.profileFontFamilyUrls?.length > 0 &&
          profileData.styles.profileFontFamilyUrls.map((fontFamilyUrl, index) => (
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
      <LinkView profileData={profileData} />
    </>
  );
}

export default Link;

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  // const cookies = cookieParser(context.req.headers.cookie);
  // const browserId = cookies.browserId;

  // if (!browserId) {
  //   context.res.setHeader("Set-Cookie", `browserId=${uniqueId()}; Path=/; Expires=Thu, 01 Jan 9999 00:00:00 GMT;`);
  // }
  //fetch data from database by context.params.link

  // if(context.params.link == "a"){
  //   return {
  //     notFound: true
  //   }
  // }


  await new Promise(resolve => setTimeout(() => resolve(), 2000));

  const props = {
    profileData: {
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      profileTitle: "A Page Title",
      profileDescription: "Page Description",
      profileImage: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
      profileBackgroundColor: "red",
      profileColor: "#fff",
      socialTheme: "color",
      socialPosition: "down",

      isSensitive: false,

      analistic: {
        googleAnalisticId: "1",
      },

      background: {
        type: "image",
        url: "https://img.freepik.com/free-photo/abstract-flowing-neon-wave-background_53876-101942.jpg?w=2000",
        color: "red",
      },

      styles: {
        profileFontFamilyUrls: ["https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"],

        profileLetterImage: {
          color: "#fff",
          backgroundColor: "red",
        },

        profileTitle: {
          color: "#fff",
          fontSize: "16px",
          fontWeight: "700",
          fontFamily: "Roboto",
        },

        profileDescription: {
          color: "red",
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Roboto",
        },

        link: {
          color: "#fff",
          backgroundColor: "#333",
          boxShadow: "0px 0px 4px red",
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Roboto",
          minHeight: "40px",
        },
      },

      links: [
        {
          id: 1,
          order: 1,
          title: "Link 1",
          link: "link1",
        },
        {
          id: 2,
          order: 2,
          title: "Link 2",
          link: "link2",
        },
      ],

      socials: [
        {
          id: 1,
          order: 1,
          type: "facebook",
          link: "https://facebook.com",
        },
        {
          id: 2,
          order: 2,
          type: "twitter",
          link: "https://twitter.com",
        },
        {
          id: 3,
          order: 3,
          type: "instagram",
          link: "https://instagram.com",
        },
        {
          id: 4,
          order: 4,
          type: "youtube",
          link: "https://youtube.com",
        },
        {
          id: 5,
          order: 5,
          type: "tiktok",
          link: "https://tiktok.com",
        },
        {
          id: 6,
          order: 6,
          type: "spotify",
          link: "https://spotify.com",
        },
        {
          id: 7,
          order: 7,
          type: "apple-music",
          link: "https://apple.music",
        },
      ],
    },
  };

  return {
    props,
  };
}
