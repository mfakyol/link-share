import Link from "next/link";
import Logo from "@/icons/Logo";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";

const links = [
  {
    id: 0,
    href: "/dashboard/links",
    title: "Links",
    page: "links",
  },
  {
    id: 1,
    href: "/dashboard/appearance",
    title: "Appearance",
    page: "appearance",
  },
  {
    id: 2,
    href: "/dashboard/socials",
    title: "Socials",
    page: "socials",
  },
  {
    id: 3,
    href: "/dashboard/settings",
    title: "Settings",
    page: "settings",
  },
];

function DashboardHeader() {
  const router = useRouter()

  return (
    <header className={classes.header}>
      <Link href="/dashboard" className={classes.logoWrapper}>
        <Logo className={classes.logo} />
      </Link>

      <nav className={classes.navbar}>
        <ul className={classes.list}>
          {links.map((link) => (
            <li key={link.id} className={`${classes.listItem} ${router.query.slug?.[0] === link.page ? classes.active : ""}`}>
              <Link href={link.href} className={classes.listItemContent}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default DashboardHeader;
