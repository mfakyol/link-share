import { fileUrl } from "@/config";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import UploadImageIcon from "@/icons/UploadImageIcon";
import { setPageSetting } from "@/store/dashboardSlice";
import { useTranslation } from "@/contexts/TranslationContext";
import pageSettingService from "@/services/pageSettingService";
import { FocusEvent, useCallback, useRef, useState } from "react";
import TextArea, { TextAreaRef } from "@/components/common/TextArea";
import TextInput, { TextInputRef } from "@/components/common/TextInput";
import EditProfileImagePopup from "@/components/popups/EditProfileImagePopup";

interface EditProfileCardProps {
  pageSetting: PageSetting;
}

function EditProfileCard({ pageSetting }: EditProfileCardProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const titleInputRef = useRef<TextInputRef>(null);
  const bioTextAreaRef = useRef<TextAreaRef>(null);

  const [showEditProfileImagePopup, setShowEditProfileImagePopup] = useState(false);

  const handleBlurInput = useCallback(
    async (input: "title" | "bio", e: FocusEvent) => {
      if (input == "title") {
        const newTitle = titleInputRef.current?.getValue().trim() || "";
        if (pageSetting.title === newTitle) return;

        const response = await pageSettingService.updateTitle(newTitle);
        if (response.status) dispatch(setPageSetting(response.data));
        else {
          //will show error
        }
      } else if (input == "bio") {
        const newBio = bioTextAreaRef.current?.getValue().trim() || "";
        if (pageSetting.bio === newBio) return;
        const response = await pageSettingService.updateBio(newBio);
        if (response.status) dispatch(setPageSetting(response.data));
        else {
          //will show error
        }
      }
    },
    [pageSetting.title, pageSetting.bio, dispatch]
  );

  return (
    <Card title="profile">
      <div className={classes.profileImageWrapper}>
        {pageSetting.profileImage ? (
          <img className={classes.profileImage} src={`${fileUrl}/${pageSetting.profileImage}`} alt="" />
        ) : (
          <div className={classes.letterContainer}>{pageSetting.username.charAt(0)}</div>
        )}

        <div className={classes.uploadImageButton} onClick={setShowEditProfileImagePopup.bind(null, true)}>
          <UploadImageIcon className={classes.uploadImageIcon} />
        </div>
        <EditProfileImagePopup visible={showEditProfileImagePopup} onClose={setShowEditProfileImagePopup.bind(null, false)} />
      </div>
      <Label htmlFor="title">{t("title")}</Label>
      <TextInput
        id="title"
        ref={titleInputRef}
        defaultValue={pageSetting.title || pageSetting.username}
        placeholder={t("title")}
        onBlur={handleBlurInput.bind(null, "title")}
      />
      <Label htmlFor="description">{t("description")}</Label>
      <TextArea
        id="description"
        ref={bioTextAreaRef}
        defaultValue={pageSetting.bio}
        placeholder={t("description")}
        onBlur={handleBlurInput.bind(null, "bio")}
      />
    </Card>
  );
}

export default EditProfileCard;
