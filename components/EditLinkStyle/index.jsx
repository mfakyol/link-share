import ColorInput from "@components/_commons/ColorInput";
import Input from "@components/_commons/Input";
import Label from "@components/_commons/Label";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./style.module.scss";

import isColor from "@lib/isColor";
import http from "services/http.service";
import { apiUrl } from "config";
import Card from "@components/Card";
import { useDispatch } from "react-redux";
import {
  setPageLinkBackgroundColor,
  setPageLinkBorderColor,
  setPageLinkColor,
  setPageLinkShadowColor,
  setPageLinkStyle,
} from "store/panelSlice";

function EditLinkStyle({ page }) {
  const dispatch = useDispatch();
  const [selectedButtonSyle, setSelectedButtonSyle] = useState(page.styles.link.style || "fill");
  const [buttonTextColor, setButtonTextColor] = useState(page.styles.link.color || "#ffffff");
  const [buttonShadowColor, setButtonShadowColor] = useState(page.styles.link.shadowColor || "#ffffff");
  const [buttonBorderColor, setButtonBorderColor] = useState(page.styles.link.borderColor || "#ffffff");
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(page.styles.link.backgroundColor || "#ffffff");

  const linkStyles = useMemo(() => {
    return [
      {
        title: "fill",
        styles: [
          {
            id: "fill",
            sketchy: {
              backgroundColor: page.styles.link.backgroundColor,
            },
          },
          {
            id: "fillrounded",
            sketchy: {
              backgroundColor: page.styles.link.backgroundColor,
              borderRadius: "10px",
            },
          },
          {
            id: "fillcircular",
            sketchy: {
              backgroundColor: page.styles.link.backgroundColor,
              borderRadius: "999px",
            },
          },
        ],
      },

      {
        title: "outline",
        styles: [
          {
            id: "outline",
            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
            },
          },
          {
            id: "outlinerounded",

            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
              borderRadius: "10px",
            },
          },
          {
            id: "outlinecircular",

            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
              borderRadius: "999px",
            },
          },
        ],
      },

      {
        title: "hard shadow",

        styles: [
          {
            id: "hardshadow",

            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
              boxShadow: `4px 4px ${page.styles.link.shadowColor}`,
            },
          },
          {
            id: "hardshadowrounded",

            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
              borderRadius: "10px",
              boxShadow: `4px 4px ${page.styles.link.shadowColor}`,
            },
          },
          {
            id: "hardshadowcircular",
            sketchy: {
              border: `1px solid ${page.styles.link.borderColor}`,
              backgroundColor: "transparent",
              borderRadius: "999px",
              boxShadow: `4px 4px ${page.styles.link.shadowColor}`,
            },
          },
        ],
      },
      {
        title: "soft shadow",

        styles: [
          {
            id: "softshadow",
            sketchy: {
              backgroundColor: "transparent",
              boxShadow: `0px 1px  2px ${page.styles.link.shadowColor}44`,
            },
          },
          {
            id: "softshadowrounded",
            sketchy: {
              backgroundColor: "transparent",
              borderRadius: "10px",
              boxShadow: `0px 1px  2px ${page.styles.link.shadowColor}44`,
            },
          },
          {
            id: "softshadowcircular",
            sketchy: {
              backgroundColor: "transparent",
              borderRadius: "999px",
              boxShadow: `0px 1px  2px ${page.styles.link.shadowColor}44`,
            },
          },
        ],
      },
    ];
  }, [page.styles.link.backgroundColor, page.styles.link.borderColor, page.styles.link.shadowColor]);

  const handleClickButtonStyle = useCallback(
    (buttonStyle) => {
      if (buttonStyle == selectedButtonSyle) return;

      setSelectedButtonSyle(buttonStyle);

      http
        .postWithAuth(`${apiUrl}/appearance/style`, { style: buttonStyle })
        .then((res) => {
          if (res.status) {
            dispatch(setPageLinkStyle(buttonStyle));
          }
        })
        .catch((e) => console.log(e));
    },
    [selectedButtonSyle, dispatch]
  );

  const handleColorOnChange = useCallback((e, type) => {
    if (type == "text") setButtonTextColor(e.target.value);
    else if (type == "background") setButtonBackgroundColor(e.target.value);
    else if (type == "border") setButtonBorderColor(e.target.value);
    else if (type == "shadow") setButtonShadowColor(e.target.value);
  }, []);

  const handleColorOnBlur = useCallback(
    (e, type) => {
      if (!isColor(e.target.value)) return;
      if (!["text", "background", "border", "shadow"].some((v) => type == v)) return;
      http
        .postWithAuth(`${apiUrl}/appearance/color`, {
          type,
          color: e.target.value,
        })
        .then((res) => {
          if (res.status) {
            if (type == "text") dispatch(setPageLinkColor(e.target.value));
            if (type == "background") dispatch(setPageLinkBackgroundColor(e.target.value));
            if (type == "border") dispatch(setPageLinkBorderColor(e.target.value));
            if (type == "shadow") dispatch(setPageLinkShadowColor(e.target.value));
          }
        })
        .catch((e) => console.log(e));
    },
    [dispatch]
  );

  return (
    <Card title="Buttons">
      {linkStyles.map((linkStyleGroup) => (
        <div className={classes.linkStyleGroup} key={linkStyleGroup.title}>
          <div className={classes.linkStyleGroupTitle}>{linkStyleGroup.title}</div>
          <div className={classes.linkStyleGroupBody}>
            {linkStyleGroup.styles.map((style) => (
              <div
                key={style.id}
                className={`${classes.linkStyleWrapper} ${selectedButtonSyle == style.id ? classes.selected : ""}`}
              >
                <div
                  onClick={() => handleClickButtonStyle(style.id)}
                  className={classes.linkStyle}
                  type="text"
                  style={style.sketchy}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={classes.colors}>
        <div className={classes.colorRow}>
          <Label htmlFor="button-color">Button Color</Label>
          <div className={classes.colorCell}>
            <ColorInput
              value={buttonBackgroundColor}
              onChange={(e) => handleColorOnChange(e, "background")}
              className={classes.colorInput}
              id="button-color"
              name="button-color"
              onBlur={(e) => handleColorOnBlur(e, "background")}
            />
            <Input
              value={buttonBackgroundColor}
              onChange={(e) => handleColorOnChange(e, "background")}
              className={classes.colorTextInput}
              onBlur={(e) => handleColorOnBlur(e, "background")}
            />
          </div>
        </div>
        <div className={classes.colorRow}>
          <Label htmlFor="button-text-color">Button Text Color</Label>
          <div className={classes.colorCell}>
            <ColorInput
              value={buttonTextColor}
              onChange={(e) => handleColorOnChange(e, "text")}
              className={classes.colorInput}
              id="button-text-color"
              name="button-text-color"
              onBlur={(e) => handleColorOnBlur(e, "text")}
            />
            <Input
              value={buttonTextColor}
              onChange={(e) => handleColorOnChange(e, "text")}
              className={classes.colorTextInput}
              onBlur={(e) => handleColorOnBlur(e, "text")}
            />
          </div>
        </div>
        <div className={classes.colorRow}>
          <Label htmlFor="button-border-color">Button Border Color</Label>
          <div className={classes.colorCell}>
            <ColorInput
              value={buttonBorderColor}
              onChange={(e) => handleColorOnChange(e, "border")}
              className={classes.colorInput}
              id="button-border-color"
              name="button-border-color"
              onBlur={(e) => handleColorOnBlur(e, "border")}
            />
            <Input
              value={buttonBorderColor}
              onChange={(e) => handleColorOnChange(e, "border")}
              className={classes.colorTextInput}
              onBlur={(e) => handleColorOnBlur(e, "border")}
            />
          </div>
        </div>
        <div className={classes.colorRow}>
          <Label htmlFor="button-shadow-color">Button Shadow Color</Label>
          <div className={classes.colorCell}>
            <ColorInput
              value={buttonShadowColor}
              onChange={(e) => handleColorOnChange(e, "shadow")}
              className={classes.colorInput}
              id="button-shadow-color"
              name="button-shadow-color"
              onBlur={(e) => handleColorOnBlur(e, "shadow")}
            />
            <Input
              value={buttonShadowColor}
              onChange={(e) => handleColorOnChange(e, "shadow")}
              className={classes.colorTextInput}
              onBlur={(e) => handleColorOnBlur(e, "shadow")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EditLinkStyle;
