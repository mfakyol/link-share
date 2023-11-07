import classes from "./styles.module.scss";

interface BioProps {
  pageSetting: PageSetting;
}

function Bio({ pageSetting }: BioProps) {
  return pageSetting.bio ? (
    <p
      className={classes.bio}
      style={{
        fontFamily: pageSetting.font.fontCode,
        fontSize: pageSetting.font.descriptionFontSize,
        fontWeight: pageSetting.font.descriptionFontWeight,
        color: pageSetting.colors.fontColor,
      }}
    >
      {pageSetting.bio}
    </p>
  ) : null;
}

export default Bio;
