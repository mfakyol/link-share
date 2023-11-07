import Link from "next/link";
import classes from "./styles.module.scss";
import { CSSProperties, MouseEvent, useCallback, useEffect, useState } from "react";
import analysisService from "@/services/analysisService";
import socialTypes from "@/constants/socialTypes";

interface SocialsContainerProps {
  pageSetting: PageSetting;
}

function SocialsContainer({ pageSetting }: SocialsContainerProps) {
  const [svgs, setSvgs] = useState<string[]>([]);

  useEffect(() => {
    const func = async () => {
      const svgs = await Promise.all(
        pageSetting.socials
          .filter((s) => s.isActive)
          .map((s, index) => {
            const socialType = socialTypes.find(st => st.type == s.type)
            return fetch(`/socialIcons/${pageSetting.socialsIconStyle}/${socialType?.icon}.svg`)
              .then((res) => {
                if (res.ok) return res.text();
                else return "";
              })
              .catch(() => "");
          })
      );

      setSvgs(svgs);
    };

    func();
  }, [pageSetting.socials, pageSetting.socialsIconStyle]);

  const handleClick = useCallback(
    (social: PageSetting["socials"][number], e: MouseEvent) => {
      e.preventDefault();
      analysisService.socialClickedEvent(pageSetting.username, social.type);
      window.open(social.url, "_blank");
    },
    [pageSetting]
  );
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  if (pageSetting.socials.filter((s) => s.isActive).length == 0) return null;

  return (
    <div
      className={`${classes.socialsContainer} ${classes[pageSetting.socialsPositon]}`}
      style={pageSetting.socialsIconStyle != "color" ? ({ "--icon-color": pageSetting.socialsIconColor } as CSSProperties) : {}}
    >
      {pageSetting.socials
        .filter((s) => s.isActive)
        .map((social, index) => (
          <Link
            key={social.type}
            href={social.url}
            className={`${classes.social}`}
            onClick={handleClick.bind(null, social)}
            onAuxClick={handleClick.bind(null, social)}
            onContextMenu={handleContextMenu}
          >
            <div className={classes.iconWrapper} dangerouslySetInnerHTML={{ __html: svgs[index] }} title={socialTypes.find(st => st.type == social.type)?.label}></div>
          </Link>
        ))}
    </div>
  );
}

export default SocialsContainer;
