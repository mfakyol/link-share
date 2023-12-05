import ButtonStyle from "../ButtonStyle";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import { MouseEvent, useCallback } from "react";
import ColorInput from "@/components/common/ColorInput";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";

interface EditButtonCard {
  pageSetting: PageSetting;
}

function EditButtonCard({ pageSetting }: EditButtonCard) {
  const [t] = useTranslation()
  const dispatch = useDispatch();

  const handleChangeColor = useCallback(
    async (input: "buttonColor" | "buttonFontColor" | "buttonShadowColor", value: string) => {
      const response = await pageSettingService.updateColor({ [input]: value });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  const handleClickButtonStyle = useCallback(
    async (e: MouseEvent) => {
      const buttonStyle = (e.target as HTMLDivElement).dataset.buttonStyle;
      if (buttonStyle && buttonStyle !== pageSetting.buttonStyle) {
        const response = await pageSettingService.updateButtonStyle(buttonStyle);
        if (response.status) dispatch(setPageSetting(response.data));
        else {
          // will show error
        }
      }
      e.stopPropagation();
    },
    [dispatch, pageSetting.buttonStyle]
  );

  return (
    <Card title="button_styles">
      <div onClick={handleClickButtonStyle}>
        <p className={classes.title}>{t("fill")}</p>
        <div className={classes.row}>
          <ButtonStyle buttonStyle="fill" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="fillRound" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="fillFullRound" selectedButtonStyle={pageSetting.buttonStyle} />
        </div>
        <p className={classes.title}>{t("outline")}</p>
        <div className={classes.row}>
          <ButtonStyle buttonStyle="outline" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="outlineRound" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="outlineFullRound" selectedButtonStyle={pageSetting.buttonStyle} />
        </div>
        <p className={classes.title}>{t("shadow")}</p>
        <div className={classes.row}>
          <ButtonStyle buttonStyle="shadow" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="shadowRound" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="shadowFullRound" selectedButtonStyle={pageSetting.buttonStyle} />
        </div>
        <p className={classes.title}>{t("hard_shadow")}</p>
        <div className={classes.row}>
          <ButtonStyle buttonStyle="hardShadow" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="hardShadowRound" selectedButtonStyle={pageSetting.buttonStyle} />
          <ButtonStyle buttonStyle="hardShadowFullRound" selectedButtonStyle={pageSetting.buttonStyle} />
        </div>
      </div>
      <Label htmlFor="button-color">{t("button_color")}</Label>
      <ColorInput id="button-color" value={pageSetting.colors.buttonColor} onChange={handleChangeColor.bind(null, "buttonColor")} />
      <Label htmlFor="button-font-color">{t("button_font_color")}</Label>
      <ColorInput id="button-font-color" value={pageSetting.colors.buttonFontColor} onChange={handleChangeColor.bind(null, "buttonFontColor")} />
      <Label htmlFor="button-shadow-color">{t("button_shadow_color")}</Label>
      <ColorInput
        id="button-shadow-color"
        value={pageSetting.colors.buttonShadowColor}
        onChange={handleChangeColor.bind(null, "buttonShadowColor")}
      />
    </Card>
  );
}

export default EditButtonCard;
