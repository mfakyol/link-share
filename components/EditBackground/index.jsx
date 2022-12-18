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
import { setPageBackgroundColor, setPageBackgroundImage, setPageBackgroundType } from "store/panelSlice";
import classes from "./style.module.scss";

const backgroundTypeList = [
  { value: "flat", background: "flat", image: "" },
  { value: "linear", background: "linear", image: "" },
  { value: "wall", background: "image", image: "/default/wall.jpg" },
  { value: "sunset", background: "image", image: "/default/sunset.gif" },
];

function EditBackground({ page }) {
  const dispatch = useDispatch();

  const [backgroundColor, setBackgroundColor] = useState(page.styles.backgroundColor || "#ffffff");

  const [backgroundType, setBackgroundType] = useState(
    backgroundTypeList.find((bt) =>
      page.styles.backgroundType != "image"
        ? bt.background == page.styles.backgroundType
        : bt.image == page.styles.backgroundImage
    ) || backgroundTypeList[0]
  );

  const handleOnClickBackgroundType = useCallback(
    (backgroundType) => {
      setBackgroundType((prev) => {
        if (prev == backgroundType.value) return prev;
        http
          .postWithAuth(`${apiUrl}/appearance/backgroundType`, {
            backgroundType: backgroundType.background,
            backgroundImage: backgroundType.image,
          })
          .then((res) => {
            if (res.status) {
              dispatch(setPageBackgroundType(backgroundType.background));
              dispatch(setPageBackgroundImage(backgroundType.image));
            }
          })
          .catch((e) => console.log(e));
        return backgroundType;
      });
    },
    [dispatch]
  );

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
    if (backgroundType.value == "flat") return { backgroundColor };
    if (backgroundType.value == "linear")
      return { background: `linear-gradient(${backgroundColor}, ${colorShade(backgroundColor, 180)})` };

    if (backgroundType.image)
      return {
        backgroundImage: `url(${apiUrl}/${backgroundType.image})`,
        backgroundRepeat: " no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

    return {};
  }, []);

  return (
    <Card title="Background">
      <Label className={classes.backgroundLabel}>Background</Label>
      <div className={classes.backgroundList}>
        {backgroundTypeList.map((bt) => (
          <div
            key={bt.value}
            className={`${classes.backgroundCard}   ${backgroundType.value == bt.value ? classes.selected : ""}`}
            style={calculateBackground(bt, page.styles.backgroundColor)}
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
