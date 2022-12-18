import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import EditProfile from "@components/EditProfile";
import EditLinkStyle from "@components/EditLinkStyle";
import EditFont from "@components/EditFont";
import EditBackground from "@components/EditBackground";
import LinkView from "@views/LinkView";

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
     

        </>
      )}
    </div>
  );
}

export default Appearance;
