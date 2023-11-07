import EyeOpenIcon from "@/icons/EyeOpenIcon";
import classes from "./styles.module.scss";
import { domain } from "@/config";
import { MouseEvent, useCallback, useEffect, useState } from "react";

interface PreviewProps {
  pageSetting: PageSetting;
}

function Preview({ pageSetting }: PreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [iFrameVersion, setIFrameVersion] = useState(1);

  useEffect(() => {
    setIFrameVersion((prev) => ++prev);
  }, [pageSetting]);

  const handleClickPreview = useCallback((e: MouseEvent) => {
    setShowPreview((prev) => !prev);
  }, []);

  return (
    <>
      <div className={`${classes.phoneWrapper} ${showPreview ? classes.mobileShow : ""}`}>
        <div className={classes.phoneContainer}>
          <div className={classes.phoneFrame}>
            {pageSetting && <iframe key={iFrameVersion} src={`${domain}/${pageSetting.username}?dashboard=true&version=${iFrameVersion}`} className={classes.iframe} />}
          </div>
        </div>
      </div>
      <div className={classes.previewButton} onClick={handleClickPreview}>
        <EyeOpenIcon className={classes.previewIcon} />
      </div>
    </>
  );
}

export default Preview;
