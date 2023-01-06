import classes from "./style.module.scss";
import LinkButton from "@components/LinkButton";
import ProfileImage from "@components/ProfileImage";
import SocialLink from "@components/SocialLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import colorShade from "@lib/colorShade";
import Head from "next/head";
import { useState } from "react";
import { apiUrl } from "config";

function LinkView({ page, isInPanel }) {
  const router = useRouter();
  const [showContent, setShowContent] = useState(!page.sensitiveContentAgeLimit);

  let profileData = { ...page };

  const calculateBackgroundStyle = useCallback((profileData) => {
    if (profileData.styles.backgroundType == "flat") return { background: profileData.styles.backgroundColor };
    if (profileData.styles.backgroundType == "linear")
      return {
        backgroundColor: profileData.styles.backgroundColor,
        background: `linear-gradient(${profileData.styles.backgroundColor}, ${colorShade(
          profileData.styles.backgroundColor,
          180
        )})`,
      };
    if (profileData.styles.backgroundType == "image") {
      return {
        backgroundImage: `url(${apiUrl}/${profileData.styles.backgroundImage})`,
        backgroundRepeat: " no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { backgroundColor: "" };
  }, []);

  const calculateLinkStyle = useCallback((profileData) => {
    if (profileData.styles.link.style == "fill") {
      return {
        color: profileData.styles.link.color,
        backgroundColor: profileData.styles.link.backgroundColor,
      };
    }

    if (profileData.styles.link.style == "fillrounded") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "10px",
        backgroundColor: profileData.styles.link.backgroundColor,
      };
    }

    if (profileData.styles.link.style == "fillcircular") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "999px",
        backgroundColor: profileData.styles.link.backgroundColor,
      };
    }

    if (profileData.styles.link.style == "outline") {
      return {
        color: profileData.styles.link.color,
        border: `1px solid ${profileData.styles.link.borderColor}`,
      };
    }

    if (profileData.styles.link.style == "outlinerounded") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "10px",
        border: `1px solid ${profileData.styles.link.borderColor}`,
      };
    }

    if (profileData.styles.link.style == "outlinecircular") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "999px",
        border: `1px solid ${profileData.styles.link.borderColor}`,
      };
    }

    if (profileData.styles.link.style == "hardshadow") {
      return {
        color: profileData.styles.link.color,
        border: `1px solid ${profileData.styles.link.borderColor}`,
        boxShadow: `4px 4px ${profileData.styles.link.shadowColor}`,
      };
    }

    if (profileData.styles.link.style == "hardshadowrounded") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "10px",
        border: `1px solid ${profileData.styles.link.borderColor}`,
        boxShadow: `4px 4px ${profileData.styles.link.shadowColor}`,
      };
    }

    if (profileData.styles.link.style == "hardshadowcircular") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "999px",
        border: `1px solid ${profileData.styles.link.borderColor}`,
        boxShadow: `4px 4px ${profileData.styles.link.shadowColor}`,
      };
    }

    if (profileData.styles.link.style == "softshadow") {
      return {
        color: profileData.styles.link.color,
        boxShadow: `0px 1px  2px ${profileData.styles.link.shadowColor}44`,
      };
    }

    if (profileData.styles.link.style == "softshadowrounded") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "10px",
        boxShadow: `0px 1px  2px ${profileData.styles.link.shadowColor}44`,
      };
    }

    if (profileData.styles.link.style == "softshadowcircular") {
      return {
        color: profileData.styles.link.color,
        borderRadius: "999px",
        boxShadow: `0px 1px  2px ${profileData.styles.link.shadowColor}44`,
      };
    }
  }, []);

  return (
    <>
      {!isInPanel && !showContent && (
        <div className={classes.sensetiveContentWarningOverlay}>
          <div className={classes.sensetiveContentWarning}>
            <p className={classes.sensetiveContentWarningMessage}>
              {`This content has been marked as ${page.sensitiveContentAgeLimit}+ by its owner. Are you over ${page.sensitiveContentAgeLimit}?`}
            </p>
            <span
              onClick={() => setShowContent(true)}
              className={classes.sensetiveContentWarningButton}
            >{`I am. show me the content.`}</span>
            <span
              onClick={() => router.push("https://www.google.com")}
              className={`${classes.sensetiveContentWarningButton} ${classes.cancel}`}
            >{`I am not. Get me out of this insecure place.`}</span>
          </div>
        </div>
      )}
      <div
        className={classes.background}
        style={{
          ...calculateBackgroundStyle(profileData),
          fontFamily: profileData.styles.fontFamily.split("+").join(" "),
        }}
      >
        <Head>
          {profileData.styles.fontFamily ? (
            <link
              href={`https://fonts.googleapis.com/css2?family=${profileData.styles.fontFamily}&display=swap`}
              rel="stylesheet"
            />
          ) : null}
        </Head>

        <div className={classes.container}>
          <ProfileImage profileData={profileData} />
          <h1 className={classes.profileTitle} style={{ color: profileData.styles.fontColor }}>
            {profileData.profileTitle}
          </h1>

          {profileData.profileDescription && (
            <h2 className={classes.profileDescription} style={{ color: profileData.styles.fontColor }}>
              {profileData.profileDescription}
            </h2>
          )}
          <div className={`${classes.linksWrapper} ${profileData.styles.social.position == "top" ? classes.reverse : ""}`}>
            <div className={classes.links}>
              {[...profileData?.links]
                ?.sort()
                .filter((link) => link.show && link.isValid)
                .map((link, index) => (
                  <LinkButton key={index} href={link.href} title={link.title} style={calculateLinkStyle(profileData)} />
                ))}
            </div>

            <div className={classes.socials}>
              {profileData?.socials.filter(social => social.show).map((social) => (
                <SocialLink key={social.type} social={social} style={profileData.styles.social.style} />
              ))}
            </div>
          </div>
        </div>
        <Link href={`/?profile=${router.asPath.split("/")[1]}`}>
          <a className={classes.logoLink} rel="noopener noreferrer nofollow" target="_blank">
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </>
  );
}

export default LinkView;
