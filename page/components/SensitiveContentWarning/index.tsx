import Router from "next/router";
import classes from "./styles.module.scss";
import Cookies from "js-cookie";

interface SensitiveContentWarningProps {
  pageSetting: PageSetting;
  onClose(): void;
}

function getAllowButtonText(sensitive: string) {
  if (sensitive == "sensitive") return "Continue";
  return `I'm over ${sensitive}`;
}

function SensitiveContentWarning({ pageSetting, onClose }: SensitiveContentWarningProps) {
  const handleOnClickAllow = () => {
    onClose();
    let alowwedSensitivePages: string[] = [];
    const alowwedSensitivePagesCookie = Cookies.get("alowwedSensitivePages");

    if (alowwedSensitivePagesCookie) alowwedSensitivePages = Array.from(JSON.parse(alowwedSensitivePagesCookie)) as string[];

    console.log(alowwedSensitivePages);
    const allowedPage = alowwedSensitivePages.find((p) => p === pageSetting.username);
    if (!allowedPage) {
      alowwedSensitivePages.push(pageSetting.username);
      Cookies.set("alowwedSensitivePages", JSON.stringify(alowwedSensitivePages), {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    }
  };

  return (
    <div className={classes.sensitiveContentWarning}>
      <div className={classes.blur}>
        <div className={classes.container}>
          <p className={classes.title}>Sensitive Content</p>
          <p className={classes.text}>This page contains content that may not be suitable for you.</p>
          <button className={classes.button} onClick={handleOnClickAllow}>
            {getAllowButtonText(pageSetting.sensitiveContent)}
          </button>
          <button className={classes.button} onClick={() => Router.push("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SensitiveContentWarning;
