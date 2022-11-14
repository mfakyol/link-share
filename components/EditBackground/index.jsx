import Card from "@components/Card";
import ColorInput from "@components/_commons/ColorInput";
import Input from "@components/_commons/Input";
import Label from "@components/_commons/Label";
import colorShade from "@lib/colorShade";
import isColor from "@lib/isColor";
import { apiUrl } from "config";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import http from "services/http.service";
import { setPageBackgroundColor, setPageBackgroundType } from "store/panelSlice";
import classes from "./style.module.scss";

const backgroundTypeList = [
  { value: "flat", background: "flat" },
  { value: "linear", background: "fill" },
];

function EditBackground({ page }) {
  const dispatch = useDispatch();

  const [backgroundColor, setBackgroundColor] = useState(page.styles.backgroundColor || "#ffffff");
  const [backgroundType, setBackgroundType] = useState(
    backgroundTypeList.find((bt) => bt.value == page.styles.backgroundType) || backgroundTypeList[0]
  );

  const handleOnClickBackgroundType = useCallback((backgroundType) => {
    setBackgroundType((prev) => {
      if (prev == backgroundType.value) return prev;
      http
        .postWithAuth(`${apiUrl}/appearance/backgroundType`, { backgroundType: backgroundType.value })
        .then((res) =>{
          if(res.status){
            dispatch(setPageBackgroundType(backgroundType.value))
          }
        })
        .catch((e) => console.log(e));
      return backgroundType;
    });
  }, [dispatch]);

  const handleBackgroundColorOnChange = useCallback((e) => {
    setBackgroundColor(e.target.value);
  }, []);

  const handleBackgroundColorOnBlur = useCallback(
    (e) => {
      if (!isColor(e.target.value)) return;
      http
        .postWithAuth(`${apiUrl}/appearance/backgroundColor`, { backgroundColor: e.target.value })
        .then((res) => {
          if (res.status) {
            dispatch(setPageBackgroundColor(e.target.value));
          }
        })
        .catch((e) => console.log(e));
    },
    [dispatch]
  );

  const calculateBackground = useCallback((backgroundType, backgroundColor) => {
    if (backgroundType == "flat") return { backgroundColor };
    else if (backgroundType == "linear")
      return { background: `linear-gradient(${backgroundColor}, ${colorShade(backgroundColor, 180)})` };
    return "";
  }, []);

  return (
    <Card title="Background">
      <Label>Background</Label>
      <div className={classes.backgroundList}>
        {backgroundTypeList.map((bt) => (
          <div
            key={bt.value}
            className={`${classes.backgroundCard}   ${backgroundType.value == bt.value ? classes.selected : ""}`}
            style={calculateBackground(bt.value, page.styles.backgroundColor)}
            onClick={() => handleOnClickBackgroundType(bt)}
          ></div>
        ))}
      </div>
      <Label>Background Color</Label>
      <div className={classes.colorCell}>
        <ColorInput
          value={backgroundColor}
          onChange={handleBackgroundColorOnChange}
          className={classes.colorInput}
          id="background-color"
          name="background-color"
          onBlur={handleBackgroundColorOnBlur}
        />
        <Input
          value={backgroundColor}
          onChange={handleBackgroundColorOnChange}
          className={classes.colorTextInput}
          onBlur={handleBackgroundColorOnBlur}
        />
      </div>
    </Card>
  );
}

export default EditBackground;
