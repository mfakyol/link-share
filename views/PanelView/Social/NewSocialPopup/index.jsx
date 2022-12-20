import Popup from "@components/Popup";
import classes from "./style.module.scss";
import { useCallback, useMemo, useState } from "react";
import socialListData from "@constants/socialList";
import AddOrEditSocialPopup from "../AddOrEditSocialPopup";
import { useSelector } from "react-redux";

function NewSocialPopup({ show, setShow }) {
  const socials = useSelector((state) => state.panel.page.socials);

  const [selectedSocial, setSelectedSocial] = useState();

  const handleOnClick = useCallback(
    (e, social) => {
      setSelectedSocial(social);
      setShow(false);
    },
    [setShow]
  );

  const handleOnBack = useCallback(() => {
    setSelectedSocial(undefined);
    setShow(true);
  }, [setShow]);

  const socialList = useMemo(() => {
    return socialListData.map((data) => {
      return { ...data, isExist: socials?.some((social) => social.type == data.type) };
    });
  }, [socials]);

  return (
    <>
      <Popup show={show} onClose={() => setShow(false)} title="Add Social Icon">
        <ul className={classes.socialList}>
          {socialList.map((social) => (
            <li
              key={social.type}
              className={`${classes.socialItem} ${social.isExist ? classes.exist : ""}`}
              onClick={(e) => handleOnClick(e, social)}
            >
              <img className={classes.socialIcon} src={`/icons/social/color/${social.icon}`} alt="" />
              <span className={classes.socialName}>{social.name}</span>
              {social.isExist ? <span className={classes.existText}>Exist</span> : <img className={classes.arrowIcon} src="/icons/arrow.svg" alt="" />}
            </li>
          ))}
        </ul>
      </Popup>

      <AddOrEditSocialPopup social={selectedSocial} setSocial={setSelectedSocial} onBack={handleOnBack} />
    </>
  );
}

export default NewSocialPopup;
