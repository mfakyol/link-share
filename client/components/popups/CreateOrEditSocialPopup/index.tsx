import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Button from "@/components/common/Button";
import { setPageSetting } from "@/store/dashboardSlice";
import Popup, { PopupRef } from "@/components/common/Popup";
import pageSettingService from "@/services/pageSettingService";
import TextInput, { TextInputRef } from "@/components/common/TextInput";
import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

import socialTypes from "@/constants/socialTypes";

interface CreateOrEditSocialPopupProps {
  visible: boolean;
  onClose(): void;
  social?: PageSetting["socials"][number];
}

type PopupData = { step: number; socialData?: { url?: string; type?: number } };

function CreateOrEditSocialPopup({ visible, social, onClose }: CreateOrEditSocialPopupProps) {
  const dispatch = useDispatch();
  const popupRef = useRef<PopupRef>(null);
  const urlInputRef = useRef<TextInputRef>(null);

  const [popupData, setPopupData] = useState<PopupData>({
    step: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (social) setPopupData({ step: 2, socialData: social });
    else setPopupData({ step: 1, socialData: undefined });
  }, [social]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!popupData.socialData?.type) return;

      let isValid = true;

      const urlInput = urlInputRef.current;
      const url = urlInput?.getValue() || "";

      if (!url) {
        isValid = false;
        urlInput?.setError("required");
      }

      if (!isValid) return;

      setIsLoading(true);
      const response = await pageSettingService.updateOrCreateSocial({ type: popupData.socialData.type, url, isActive: true });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
      setIsLoading(false);
      popupRef.current?.closePopup?.();
    },
    [dispatch, popupData]
  );

  const getTitle = useCallback((popupData: PopupData) => {
    if (popupData.step == 1) return "Create New Social Link";
    return popupData.socialData
      ? `Update ${socialTypes.find((st) => st.type === popupData.socialData?.type)?.label} Link`
      : `Create ${socialTypes.find((st) => st.type === popupData.socialData?.type)?.label} Link`;
  }, []);

  const selectedSocial = socialTypes.find((st) => st.type == social?.type);

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      ref={popupRef}
      onBack={popupData?.step == 2 && !social ? setPopupData.bind(null, { step: 1 }) : undefined}
      title={getTitle(popupData)}
      containerClassName={classes.container}
    >
      {popupData?.step == 1 ? (
        <div className={classes.socials}>
          {socialTypes.map((social) => (
            <div key={social.type} className={classes.social} onClick={setPopupData.bind(null, { step: 2, socialData: { type: social.type } })}>
              <img className={classes.socialIcon} src={`/socialIcons/color/${social.icon}.svg`} alt="" />
              <span className={classes.socialText}>{social.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextInput ref={urlInputRef} placeholder="Url" defaultValue={popupData.socialData?.url} />

          <p className={classes.example}>
            Example: <span className={classes.exampleText}>{selectedSocial?.examples.join(" or ")}</span>
          </p>

          <Button color="blue" loading={isLoading}>
            {social ? "Update" : "Create"}
          </Button>
        </form>
      )}
    </Popup>
  );
}

export default CreateOrEditSocialPopup;
