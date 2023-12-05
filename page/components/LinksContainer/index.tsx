import Link from "next/link";
import classes from "./styles.module.scss";
import { CSSProperties, MouseEvent, useCallback } from "react";
import convertHextToRGBA from "@/utils/convertHextToRGBA";
import analyticsService from "@/services/analyticsService";

interface LinksContainerProps {
  pageSetting: PageSetting;
}

function LinksContainer({ pageSetting }: LinksContainerProps) {
  const { r, g, b } = convertHextToRGBA(pageSetting.colors.buttonShadowColor);
  const buttonSoftShadowColor = `rgba(${r},${g},${b},0.3)`;

  const variables = {
    fontFamily: pageSetting.font.fontCode,
    fontSize: pageSetting.font.buttonFontSize,
    fontWeight: pageSetting.font.buttonFontWeight,
    "--backgroundColor": pageSetting.colors.backgroundColor,
    "--fontColor": pageSetting.colors.fontColor,
    "--buttonColor": pageSetting.colors.buttonColor,
    "--buttonFontColor": pageSetting.colors.buttonFontColor,
    "--buttonShadowColor": pageSetting.colors.buttonShadowColor,
    "--buttonSoftShadowColor": buttonSoftShadowColor,
  } as CSSProperties;

  const handleClick = useCallback(
    (link: PageSetting["links"][number], e: MouseEvent) => {
      e.preventDefault();
      analyticsService.linkClickedEvent(pageSetting.username, link._id);
      window.open(link.url, "_blank");
    },
    [pageSetting]
  );
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  if (pageSetting.links.filter((l) => l.isActive).length == 0) return null;

  return (
    <div className={classes.linksContainer} style={variables}>
      {pageSetting.links
        .filter((l) => l.isActive)
        .map((link) => (
          <Link
            key={link._id}
            href={link.url}
            target="_blank"
            className={`${classes.link} ${classes[pageSetting.buttonStyle]}`}
            onClick={handleClick.bind(null, link)}
            onAuxClick={handleClick.bind(null, link)}
            onContextMenu={handleContextMenu}
          >
            {link.title}
          </Link>
        ))}
    </div>
  );
}

export default LinksContainer;
