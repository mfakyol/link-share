import classes from "./styles.module.scss";

interface TitleProps {
  pageSetting: PageSetting;
}

function Title({ pageSetting }: TitleProps) {
  return (
    <div
      className={classes.title}
      style={{ fontFamily: pageSetting.font.fontCode, fontSize: pageSetting.font.titleFontSize, fontWeight: pageSetting.font.titleFontWeight, color: pageSetting.colors.fontColor }}
    >
      {pageSetting.title || pageSetting.username}
    </div>
  );
}

export default Title;
