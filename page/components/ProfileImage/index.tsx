import { fileUrl } from "@/config";
import classes from "./styles.module.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ProfileImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pageSetting?: PageSetting;

  clasName?: string;
}

function ProfileImage({ pageSetting, clasName, ...props }: ProfileImageProps) {
  return (
    <div className={classes.profileImageContainer} {...props}>
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
