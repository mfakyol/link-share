import { pageDomain } from "@/config";
import classes from "./styles.module.scss";
import EyeOpenIcon from "@/icons/EyeOpenIcon";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

interface PreviewProps {
  pageSetting: PageSetting;
}

function Preview({ pageSetting }: PreviewProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [iFrameVersion, setIFrameVersion] = useState(1);
  const [s, setS] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.src = `${pageDomain}/p/${pageSetting.username}?dashboard=true`;
  }, [pageSetting]);

  const handleClickPreview = useCallback((e: MouseEvent) => {
    setShowPreview((prev) => !prev);
  }, []);

  return (
    <>
      <div className={`${classes.phoneWrapper} ${showPreview ? classes.mobileShow : ""}`}>
        <div className={classes.phoneContainer}>
          <div className={classes.phoneFrame}>
            {!s && "x"}
            {pageSetting && <iframe ref={ref} key={iFrameVersion} className={classes.iframe} onLoad={setS.bind(null, true)} />}
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
