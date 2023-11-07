import EditButtonCard from "@/components/dashboard/EditButtonCard";
import classes from "./page.module.scss";
import EditProfileCard from "@/components/dashboard/EditProfileCard";
import EditFontCard from "@/components/dashboard/EditFontCard";
import EditBackgroundCard from "@/components/dashboard/EditBackgroundCard";

interface AppearanceContentProps {
  pageSetting: PageSetting;
}

function AppearanceContent({ pageSetting }: AppearanceContentProps) {
  return (
    <div className={classes.wrapper}>
      <EditProfileCard pageSetting={pageSetting} />
      <EditBackgroundCard pageSetting={pageSetting}/>
      <EditButtonCard pageSetting={pageSetting}/>
      <EditFontCard pageSetting={pageSetting}/>
    </div>
  );
}

export default AppearanceContent;
