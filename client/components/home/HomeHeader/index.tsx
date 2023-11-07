import Logo from "@/icons/Logo";
import classes from "./styles.module.scss";
import Link from "next/link";

function HomeHeader() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo width={114} height={38} />
      </Link>
 
      <nav className={classes.navbar}>
        <div className={classes.buttons}>
          <Link href="/login" className={`${classes.button} ${classes.loginButton}`}>
            Login
          </Link>
          <Link href="/signup" className={`${classes.button} ${classes.registerButton}`}>
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default HomeHeader;
