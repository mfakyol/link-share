import { fileUrl } from "@/config";
import classes from "./styles.module.scss";

interface ProfileImageProps {
  pageSetting: PageSetting;
}

function ProfileImage({ pageSetting }: ProfileImageProps) {
  return (
    <div className={classes.profileImageContainer}>
      {pageSetting.profileImage ? (
        <img className={classes.image} src={`${fileUrl}/${pageSetting.profileImage}`} alt="" />
      ) : (
        <div className={classes.firstLetter}>{pageSetting.username.charAt(0)}</div>
      )}
    </div>
  );
}

export default ProfileImage;
