import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import ColorInput from "@/components/common/ColorInput";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";

const positionOptions = [
  { label: "Up", value: "up" },
  { label: "Down", value: "down" },
];
const styleOptions = [
  { label: "Outline", value: "outline" },
  { label: "Fill", value: "fill" },
  { label: "Color", value: "color" },
];

interface EditSocialIconStyleCardProps {
  pageSetting: PageSetting;
}

function EditSocialIconStyleCard({ pageSetting }: EditSocialIconStyleCardProps) {
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
    <Card title="Social Icon Style">
      <Label htmlFor="icon-position">Icons Position</Label>
      <RadioButtonGroup
        options={positionOptions}
        name="icon-position"
        value={pageSetting.socialsPositon}
        onChange={handleChangeSocialIconPosition}
      />
      <Label htmlFor="icon-style">Icons Position</Label>
      <RadioButtonGroup options={styleOptions} name="icon-style" value={pageSetting.socialsIconStyle} onChange={handleChangeSocialIconStyle} />
      <Label htmlFor="icon-color">Icons Color</Label>
      <ColorInput id="icon-color" value={pageSetting.socialsIconColor} onChange={handleChangeSocialsIconColor} />
    </Card>
  );
}

export default EditSocialIconStyleCard;
