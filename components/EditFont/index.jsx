import classes from "./style.module.scss";
import fontList from "@constants/fontList";
import Dropdown from "@commons/Dropdown";
import { useCallback, useState } from "react";
import ColorInput from "@components/_commons/ColorInput";
import Label from "@components/_commons/Label";
import Input from "@components/_commons/Input";
import isColor from "@lib/isColor";
import http from "services/http.service";
import { apiUrl } from "config";
import Card from "@components/Card";
import { setPageFontColor, setPageFontFamily } from "store/panelSlice";
import { useDispatch } from "react-redux";

function EditFont({ page }) {
  const dispatch = useDispatch();

  const [selectedFont, setSelectedFont] = useState(
    fontList.find((font) => font.value == page.styles.fontFamily) || fontList[0]
  );
  const [fontColor, setFontColor] = useState(page.styles.fontColor || "#000000");

  const handleFontColorOnChange = useCallback((e) => {
    setFontColor(e.target.value);
  }, []);
  const handleFontColorOnBlur = useCallback((e) => {
    if (!isColor(e.target.value)) return;
    http
      .postWithAuth(`${apiUrl}/appearance/fontColor`, { fontColor: e.target.value })
      .then((res) => {
        if (res.status) {
          dispatch(setPageFontColor(e.target.value));
        }
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const handleSelectFont = useCallback((option) => {
    setSelectedFont(option);
    http
      .postWithAuth(`${apiUrl}/appearance/fontFamily`, { fontFamily: option.value })
      .then((res) => {
        if (res.status) {
          dispatch(setPageFontFamily( option.value));
        }
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <Card title="Font">
      <Label htmlFor="font-family">Font Family</Label>
      <Dropdown
        id="font-family"
        name="font-family"
        options={fontList}
        selected={selectedFont}
        setSelected={handleSelectFont}
      />
      <Label htmlFor="font-color">Font Color</Label>

      <div className={classes.colorCell}>
        <ColorInput
          value={fontColor}
          onChange={(e) => handleFontColorOnChange(e, "background")}
          className={classes.colorInput}
          id="font-color"
          name="font-color"
          onBlur={(e) => handleFontColorOnBlur(e, "background")}
        />
        <Input
          value={fontColor}
          onChange={(e) => handleFontColorOnChange(e, "background")}
          className={classes.colorTextInput}
          onBlur={(e) => handleFontColorOnBlur(e, "background")}
        />
      </div>
    </Card>
  );
}

export default EditFont;
