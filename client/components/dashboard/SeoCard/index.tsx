import Card from "@/components/common/Card";
import classes from "./styles.module.scss";
import Label from "@/components/common/Label";
import TextInput from "@/components/common/TextInput";
import { FocusEvent, useCallback } from "react";
import pageSettingService from "@/services/pageSettingService";
import { useDispatch } from "react-redux";
import { setPageSetting } from "@/store/dashboardSlice";

interface SeoCardProps {
  pageSetting: PageSetting;
}

function SeoCard({ pageSetting }: SeoCardProps) {
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
      <Label htmlFor="meta-title">Meta Title</Label>
      <TextInput id="meta-title" placeholder="Title" defaultValue={pageSetting.meta.title} onBlur={handleBlurInput.bind(null, "title")} />
      <Label htmlFor="meta-description">Meta Description</Label>
      <TextInput
        id="meta-description"
        placeholder="Description"
        defaultValue={pageSetting.meta.description}
        onBlur={handleBlurInput.bind(null, "description")}
      />
    </Card>
  );
}

export default SeoCard;
