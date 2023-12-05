import { useCallback } from "react";
import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Card from "@/components/common/Card";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";

interface SensitiveContentCardProps {
  pageSetting: PageSetting;
}

const options = [
  { value: "", label: "no_sensitive" },
  { value: "sensitive", label: "sensitive" },
  { value: "18", label: "+18" },
  { value: "25", label: "+25" },
];

function SensitiveContentCard({ pageSetting }: SensitiveContentCardProps) {
  const [t] = useTranslation();
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
    <Card title={t("sensitive_content")}>
      <p className={classes.text}>{t("sensitive_content_description")}</p>
      <RadioButtonGroup name="sensitive-content" options={options} value={pageSetting.sensitiveContent} onChange={handleChangeSensitiveContent} />
    </Card>
  );
}

export default SensitiveContentCard;
