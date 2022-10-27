import classes from "./style.module.scss";
import LinkButton from "@components/LinkButton";
import ProfileImage from "@components/ProfileImage";
import Head from "next/head";
import SocialLink from "@components/SocialLink";
import Link from "next/link";
import { useRouter } from "next/router";

function LinkView({ profileData }) {
  const router = useRouter();

  return (
    <>
      <div
        className={classes.background}
        style={{
          background:
            profileData.background.type == "image"
              ? `url(${profileData.background.url})`
              : profileData.background.color,
        }}
      >
        <div className={classes.container}>
          <ProfileImage profileData={profileData} />
          <h1 style={profileData.styles.profileTitle} className={classes.profileTitle}>
            {profileData.profileTitle}
          </h1>

          {profileData.profileDescription && (
            <h2 style={profileData.styles.profileDescription} className={classes.profileDescription}>
              {profileData.profileDescription}
            </h2>
          )}
          <div className={`${classes.linksWrapper} ${profileData.socialPosition == "up" ? classes.reverse : ""}`}>
            <div className={classes.links}>
              {profileData.links.sort().map((link) => (
                <LinkButton key={link.id} link={link.link} title={link.title} style={profileData.styles.link} />
              ))}
            </div>

            <div className={classes.socials}>
              {profileData.socials.sort().map((social) => (
                <SocialLink key={social.id} social={social} theme={profileData.socialTheme} />
              ))}
            </div>
          </div>
        </div>
        <Link href={`/?profile=${router.asPath.split("/")[1]}`}>
          <a className={classes.logoLink}>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </>
  );
}

export default LinkView;
