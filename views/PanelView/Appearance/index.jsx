import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import EditFont from "@components/EditFont";
import EditSocial from "@components/EditSocial";
import EditProfile from "@components/EditProfile";
import EditLinkStyle from "@components/EditLinkStyle";
import EditBackground from "@components/EditBackground";

function Appearance() {
  const page = useSelector((state) => state.panel.page);

  return (
    <div className={classes.appearance}>
      {page && (
        <>
          <EditProfile page={page} />
          <EditBackground page={page} />
          <EditLinkStyle page={page} />
          <EditFont page={page} />
          <EditSocial page={page} />
        </>
      )}
    </div>
  );
}

export default Appearance;
