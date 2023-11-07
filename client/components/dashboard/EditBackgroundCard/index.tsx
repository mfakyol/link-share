import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Card from "@/components/common/Card";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";

import { generateGradient } from "@/utils/generateGradient";
import ColorInput from "@/components/common/ColorInput";
import Label from "@/components/common/Label";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";

interface EditBackgroundCardProps {
  pageSetting: PageSetting;
}

const backgroundTypes = ["flat", "gradient"];
const gradientType = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
];

function EditBackgroundCard({ pageSetting }: EditBackgroundCardProps) {
  const dispatch = useDispatch();

  const handleClickBackgroundType = useCallback(
    async (backgroundType: string) => {
      const response = await pageSettingService.updateBackgroundType(backgroundType);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );
  const handleChangeBackgroundColor = useCallback(
    async (backgroundColor: string) => {
      const response = await pageSettingService.updateColor({ backgroundColor });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  const handleChangeGradientDirection = useCallback(
    async (gradientDirection: string) => {
      const response = await pageSettingService.updateColor({ gradientDirection });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  )
  

  return (
    <Card title="Background">
      <div className={classes.backgrounds}>
        {backgroundTypes.map((backgroundType) => (
          <div
            onClick={handleClickBackgroundType.bind(null, backgroundType)}
            key={backgroundType}
            className={`${classes.background} ${classes[backgroundType]} ${backgroundType === pageSetting.backgroundType ? classes.selected : ""}`}
            style={backgroundType === "gradient" ? { background: generateGradient("#333", pageSetting.colors.gradientDirection === "up" ? 180 : 0) } : {}}
          ></div>
        ))}
      </div>
      <Label htmlFor="gradient-direction">Gradient Direction</Label>
      <RadioButtonGroup options={gradientType} name="gradient-direction" value={pageSetting.colors.gradientDirection} onChange={handleChangeGradientDirection} />
      <Label htmlFor="background-color">Background Color</Label>
      <ColorInput id="background-color" value={pageSetting.colors.backgroundColor} onChange={handleChangeBackgroundColor} /> 
    </Card>
  );
}

export default EditBackgroundCard;
