import classes from "./style.module.scss";

function SocialLink({ social, theme }) {
  return (
    <a className={classes.social} rel="noopener noreferrer nofollow external" target="_blank" href={social.href}>
      <img src={`/icons/social/${theme}/${social.type}.svg`} alt={social.type} />
    </a>
  );
}

export default SocialLink;
