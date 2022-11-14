import Link from "next/link";
import classes from "./style.module.scss";

function PanelNavbar() {
  return (
    <header className={classes.settingsNavbar}>
      <ul className={classes.tabs}>
        <li className={classes.tab}>
          <Link href="/panel/links">
            <a className={classes.tabContent}>Links</a>
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/appearance">
            <a className={classes.tabContent}>Appearance</a>
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/settings">
            <a className={classes.tabContent}>Settings</a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default PanelNavbar;
