import Link from "next/link";
import Logo from "@/icons/Logo";
import { useRouter } from "next/router";
import classes from "./styles.module.scss";
import AccountDropDown from "./AccountDropdown";
import { useTranslation } from "@/contexts/TranslationContext";

const links = [
  {
    id: 0,
    href: "/dashboard/links",
    page: "links",
  },
  {
    id: 1,
    href: "/dashboard/appearance",
    page: "appearance",
  },
  {
    id: 2,
    href: "/dashboard/socials",
    page: "socials",
  },
  {
    id: 3,
    href: "/dashboard/analytics",
    page: "analytics",
  },
  {
    id: 4,
    href: "/dashboard/settings",
    page: "settings",
  },
];

function DashboardHeader() {
  const router = useRouter();
  const [t] = useTranslation();

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
                {t(link.page)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.rightMenu}>
        <AccountDropDown/>
      </div>
    </header>
  );
}

export default DashboardHeader;
