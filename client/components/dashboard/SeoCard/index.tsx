import { useDispatch } from "react-redux";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import { FocusEvent, useCallback } from "react";
import TextInput from "@/components/common/TextInput";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";

interface SeoCardProps {
  pageSetting: PageSetting;
}

function SeoCard({ pageSetting }: SeoCardProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const handleBlurInput = useCallback(
    async (input: "title" | "description", e: FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (pageSetting.meta[input] === value) return;
      const response = await pageSettingService.updateMetaData({ key: input, value });
      if (response.status) {
        dispatch(setPageSetting(response.data));
      } else {
        // will show error
      }
    },
    [dispatch, pageSetting]
  );

  return (
    <Card title="SEO">
      <Label htmlFor="meta-title">{t("meta_title")}</Label>
      <TextInput id="meta-title" placeholder={t("meta_title")} defaultValue={pageSetting.meta.title} onBlur={handleBlurInput.bind(null, "title")} />
      <Label htmlFor="meta-description">{t("meta_description")}</Label>
      <TextInput
        id="meta-description"
        placeholder={t("meta_description")}
        defaultValue={pageSetting.meta.description}
        onBlur={handleBlurInput.bind(null, "description")}
      />
    </Card>
  );
}

export default SeoCard;
