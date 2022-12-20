import classes from "./style.module.scss";

function SocialLink({ social, style }) {
  return (
    <a className={classes.social} rel="noopener noreferrer nofollow external" target="_blank" href={social.href}>
      <img src={`/icons/social/${style}/${social.type}.svg`} alt={social.type} />
    </a>
  );
}

export default SocialLink;
