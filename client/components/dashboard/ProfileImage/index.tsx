import { fileUrl } from "@/config";
import classes from "./styles.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ProfileImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pageSetting?: PageSetting;
  type?: "dasboard" | "dasboardInner";
  clasName?: string;
}

function ProfileImage({ pageSetting, type = "dasboard", clasName, ...props }: ProfileImageProps) {
  return (
    <div className={`${classes.profileImageContainer} ${classes[type]} ${clasName}`} {...props}>
      {pageSetting ? (
        <>
          {pageSetting.profileImage ? (
            <img className={classes.image} src={`${fileUrl}/${pageSetting.profileImage}`} alt="" />
          ) : (
            <div className={classes.firstLetter}>{pageSetting.username.charAt(0)}</div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default ProfileImage;
