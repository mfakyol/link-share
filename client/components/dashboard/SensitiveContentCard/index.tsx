import Card from "@/components/common/Card";
import classes from "./styles.module.scss";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import Label from "@/components/common/Label";
import { useCallback } from "react";
import pageSettingService from "@/services/pageSettingService";
import { useDispatch } from "react-redux";
import { setPageSetting } from "@/store/dashboardSlice";

interface SensitiveContentCardProps {
  pageSetting: PageSetting;
}

const options = [
  { value: "", label: "No Sensitive" },
  { value: "sensitive", label: "Sensitive" },
  { value: "18", label: "+18" },
  { value: "25", label: "+25" },
];

function SensitiveContentCard({ pageSetting }: SensitiveContentCardProps) {
  const dispatch = useDispatch();

  const handleChangeSensitiveContent = useCallback(
    async (sensitiveContent: string) => {
      const response = await pageSettingService.updateSensitiveContent(sensitiveContent);
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  return (
    <Card title="Sensitive Content">
      <p className={classes.text}>If there is sensitive content, users will be warned before viewing the page.</p>
      <RadioButtonGroup name="sensitive-content" options={options} value={pageSetting.sensitiveContent} onChange={handleChangeSensitiveContent} />
    </Card>
  );
}

export default SensitiveContentCard;
