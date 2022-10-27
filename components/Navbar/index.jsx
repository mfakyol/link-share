import Link from "next/link";
import Logo from "@commons/Logo";
import classes from "./style.module.scss";

function Navbar({ hideAuthButtons = false }) {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a className={classes.logoWrapper}>
          <Logo className={classes.logo} />
        </a>
      </Link>

      {hideAuthButtons ? (
        null
      ) : (
        <nav className={classes.nav}>
          <Link href="/login">
            <a className={classes.login}>Login</a>
          </Link>
          <Link href="/signup">
            <a className={classes.signUp}>Sign Up</a>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
