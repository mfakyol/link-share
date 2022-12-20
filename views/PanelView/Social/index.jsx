import { useState } from "react";
import { useSelector } from "react-redux";
import NewSocialPopup from "./NewSocialPopup";
import classes from "./style.module.scss";

function Social() {
  const page = useSelector((state) => state.panel.page);
  const [showNewSocialPopup, setShowNewSocialPopup] = useState(true);

  return (
    <>
      <NewSocialPopup show={showNewSocialPopup} setShow={setShowNewSocialPopup} />
      <div className={classes.socialWrapper}>
        <button className={classes.addSocialButton} onClick={() => setShowNewSocialPopup(true)}>
          Add New Social Icon
        </button>
      </div>
      {page && <div>
        <ul className={classes.socialList}>
          <li></li>
          </ul></div>}
    </>
  );
}

export default Social;
