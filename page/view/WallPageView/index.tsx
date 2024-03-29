import ProfileImage from "@/components/ProfileImage";
import classes from "./styles.module.scss";
import Title from "@/components/Title";
import Bio from "@/components/Bio";
import LinksContainer from "@/components/LinksContainer";
import { CSSProperties } from "react";
import { generateGradient } from "@/utils/generateGradient";
import SocialsContainer from "@/components/SocialsContainer";
import {} from "next";

interface WallPageViewProps {
  pageSetting: PageSetting;
  hideContent: boolean;
}

function WallPageView({ pageSetting, hideContent }: WallPageViewProps) {
  return (
    <main className={`${classes.main} ${hideContent ? classes.hideContent : ""}`} style={createBackgroundStyle(pageSetting)}>
      <link href={`/p/fonts/${pageSetting.font.fontCode}/style.css`} rel="stylesheet" />
      <div className={classes.container}>
        <ProfileImage pageSetting={pageSetting} />
        <Title pageSetting={pageSetting} />
        <Bio pageSetting={pageSetting} />
        {pageSetting.socialsPositon == "up" ? (
          <>
            <SocialsContainer pageSetting={pageSetting} />
            <LinksContainer pageSetting={pageSetting} />
          </>
        ) : (
          <>
            <LinksContainer pageSetting={pageSetting} />
            <SocialsContainer pageSetting={pageSetting} />
          </>
        )}
      </div>
    </main>
  );
}

export default WallPageView;

function createBackgroundStyle(pageSetting: PageSetting) {
  if (pageSetting.backgroundType === "flat") {
    return {
      backgroundColor: pageSetting.colors.backgroundColor || "#000",
    } as CSSProperties;
  } else if (pageSetting.backgroundType === "gradient") {
    return {
      background: generateGradient(pageSetting.colors.backgroundColor || "#000", pageSetting.colors.gradientDirection === "up" ? 180 : 0),
    };
  } else return {};
}
