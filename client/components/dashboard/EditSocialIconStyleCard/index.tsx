import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import ColorInput from "@/components/common/ColorInput";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";

const positionOptions = [
  { label: "up", value: "up" },
  { label: "down", value: "down" },
];
const styleOptions = [
  { label: "outline", value: "outline" },
  { label: "fill", value: "fill" },
  { label: "color", value: "color" },
];

interface EditSocialIconStyleCardProps {
  pageSetting: PageSetting;
}

function EditSocialIconStyleCard({ pageSetting }: EditSocialIconStyleCardProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const handleChangeSocialIconPosition = useCallback(
    async (value: string) => {
      const response = await pageSettingService.updateSocialsPosition(value);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  const handleChangeSocialIconStyle = useCallback(
    async (value: string) => {
      const response = await pageSettingService.updateSocialsStyle(value);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );
  const handleChangeSocialsIconColor = useCallback(
    async (value: string) => {
      const response = await pageSettingService.updateSocialsIconColor(value);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  return (
    <Card title={t("social_icon_style")}>
      <Label htmlFor="icon-position">{t("icon_position")}</Label>
      <RadioButtonGroup options={positionOptions} name="icon-position" value={pageSetting.socialsPositon} onChange={handleChangeSocialIconPosition} />
      <Label htmlFor="icon-style">{t("icon_style")}</Label>
      <RadioButtonGroup options={styleOptions} name="icon-style" value={pageSetting.socialsIconStyle} onChange={handleChangeSocialIconStyle} />
      <Label htmlFor="icon-color">{t("icon_color")}</Label>
      <ColorInput id="icon-color" value={pageSetting.socialsIconColor} onChange={handleChangeSocialsIconColor} />
    </Card>
  );
}

export default EditSocialIconStyleCard;
