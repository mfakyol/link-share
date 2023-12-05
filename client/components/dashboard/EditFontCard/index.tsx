import { useDispatch } from "react-redux";
import Card from "@/components/common/Card";
import Label from "@/components/common/Label";
import fontService from "@/services/fontService";
import ColorInput from "@/components/common/ColorInput";
import { setPageSetting } from "@/store/dashboardSlice";
import { useCallback, useEffect, useState } from "react";
import Select, { Option } from "@/components/common/Select";
import pageSettingService from "@/services/pageSettingService";
import { useTranslation } from "@/contexts/TranslationContext";

interface EditFontCardProps {
  pageSetting: PageSetting;
}

function EditFontCard({ pageSetting }: EditFontCardProps) {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [fontOptions, setFontOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    const func = async () => {
      const response = await fontService.getFonts();
      if (response.status) {
        setFontOptions(response.list.map((item) => ({ value: item._id, label: item.fontFamily })));
      }
    };
    func();
  }, []);

  const handleChangeColor = useCallback(
    async (value: string) => {
      const response = await pageSettingService.updateColor({ fontColor: value });
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );
  const handleChangeFont = useCallback(
    async (selected: Option) => {
      const response = await pageSettingService.updateFont(selected.value.toString());
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    },
    [dispatch]
  );

  return (
    <Card title="font">
      <Label htmlFor="font-family">{t("font_family")}</Label>
      <Select id="font-family" options={fontOptions} defaultValue={pageSetting.font._id} onChange={handleChangeFont} />
      <Label htmlFor="font-color">{t("font_color")}</Label>
      <ColorInput id="font-color" value={pageSetting.colors.fontColor} onChange={handleChangeColor} />
    </Card>
  );
}

export default EditFontCard;
