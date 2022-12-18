import Link from "next/link";
import { useState } from "react";
import classes from "./style.module.scss";

function PanelNavbar() {
  const [show, setShow] = useState(false);

  return (
    <header className={classes.panelNavbar}>
      <Link href="/panel/links" shallow={true}>
        <a className={classes.logoWrapper}>
          <img className={classes.logo} src="/logo-small.svg" alt="" />
        </a>
      </Link>

      <img className={classes.burger} src="/icons/burger.svg" alt="" onClick={() => setShow((prev) => !prev)} />

      <ul className={`${classes.tabs} ${show ? classes.show : ""}`}>
        <li className={classes.tab}>
          <Link href="/panel/links" shallow={true}>
            <a className={classes.tabContent} onClick={() => setShow(false)}>
              Links
            </a>
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/social" shallow={true}>
            <a className={classes.tabContent} onClick={() => setShow(false)}>
              Social
            </a>
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/appearance" shallow={true}>
            <a className={classes.tabContent} onClick={() => setShow(false)}>
              Appearance
            </a>
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/settings" shallow={true}>
            <a className={classes.tabContent} onClick={() => setShow(false)}>
              Settings
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default PanelNavbar;
