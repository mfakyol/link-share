import { useRouter } from "next/router";
import classes from "./styles.module.scss";
import LinksContent from "@/view/DasboardView/LinksContent";
import SettingsPage from "@/view/DasboardView/SettingsContent";
import SocialsContent from "@/view/DasboardView/SocialsContent";
import AppearanceContent from "@/view/DasboardView/AppearanceContent";
import MyAccountContent from "@/view/DasboardView/MyAccountContent";

interface SelectDasboardContentProps {
  pageSetting: PageSetting;
}

function SelectDasboardContent({ pageSetting }: SelectDasboardContentProps) {
  const router = useRouter();

  const tab = router.query.slug?.[0] || "";
  let Content;
  console.log(tab)

  switch (tab) {
    case "appearance":
      Content = <AppearanceContent pageSetting={pageSetting} />;
      break;
    case "settings":
      Content = <SettingsPage pageSetting={pageSetting} />;
      break;
    case "socials":
      Content = <SocialsContent pageSetting={pageSetting} />;
      break;
    case "links":
    case "":
    default:
      Content = <LinksContent pageSetting={pageSetting} />;
      break;
  }

  return <div className={classes.contentContainer}>{Content}</div>;
}

export default SelectDasboardContent;
