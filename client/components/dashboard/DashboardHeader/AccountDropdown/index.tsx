import Link from "next/link";
import { pageDomain } from "@/config";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import ArrowIcon from "@/icons/ArrowIcon";
import classes from "./styles.module.scss";
import Router, { useRouter } from "next/router";
import userService from "@/services/userService";
import ThemeAutoIcon from "@/icons/ThemeAutoIcon";
import ThemeDarkIcon from "@/icons/ThemeDarkIcon";
import ThemeLightIcon from "@/icons/ThemeLightIcon";
import { useCallback, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Theme, useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/contexts/TranslationContext";
import ProfileImage from "@/components/dashboard/ProfileImage";

function AccountDropDown() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [theme, setTheme, themes] = useTheme();
  const [t, langOptions] = useTranslation();
  const pageSetting = useSelector<IRootState, PageSetting | undefined>((state) => state.dashboard.pageSetting);

  useOnClickOutside(
    dropdownRef,
    () => {
      setShow(false);
      setShowLangs(false);
      setShowThemes(false);
    },
    show
  );

  const handleClickSignOut = useCallback(async () => {
    const response = await userService.logout();
    if (response.status) {
      Router.push("/login");
    }
  }, []);

  const handleClickTheme = useCallback(
    (theme: Theme) => {
      setTheme(theme);
      setShowThemes(false);
      setShow(false);
    },
    [setTheme]
  );

  const handleClickLang = useCallback((langOption: LangOpiton) => {
    const { pathname, asPath, query } = Router;
    Router.push({ pathname, query }, asPath, { locale: langOption.id });

    setShowThemes(false);
    setShowLangs(false);
    setShow(false);
  }, []);

  const handleClickBack = useCallback(() => {
    setShowThemes(false);
    setShowLangs(false);
  }, []);

  return (
    <div ref={dropdownRef} className={classes.accountDropdown}>
      <button className={classes.dropdownButton} onClick={setShow.bind(null, !show)}>
        <ProfileImage pageSetting={pageSetting} type="dasboard" />
      </button>

      <div className={`${classes.listContainer} ${show ? classes.show : ""}`}>
        <div className={classes.optionsHeader}>
          {!showThemes && !showLangs && (
            <>
              <ProfileImage pageSetting={pageSetting} type="dasboardInner" />
              <div className={classes.accountInfo}>
                <div className={classes.title}>{pageSetting?.title || pageSetting?.username}</div>
                <Link
                  href={`${pageDomain}/p/${pageSetting?.username}`}
                  target="_blank"
                  className={classes.link}
                >{`${pageDomain}/${pageSetting?.username}`}</Link>
              </div>
            </>
          )}

          {(showThemes || showLangs) && (
            <>
              <ArrowIcon className={classes.optionsHeaderBack} onClick={handleClickBack} />
              <div className={classes.optionsHeaderTitle}>{t(showThemes ? "theme" : "language")}</div>
            </>
          )}
        </div>

        <div className={classes.options}>
          {!showThemes && !showLangs && (
            <>
              <Link href="/dashboard/account" className={classes.option} onClick={setShow.bind(null, !show)}>
                <span className={classes.optionText}>{t("my_account")}</span>
              </Link>
              <div className={classes.option} onClick={setShowThemes.bind(null, true)}>
                <ThemeIcon theme={theme} />
                <span className={classes.optionText}>{t("theme")}</span>
              </div>
              <div className={classes.option} onClick={setShowLangs.bind(null, true)}>
                <span className={classes.optionText}>{t("language")}</span>
              </div>
              <div className={classes.option} onClick={handleClickSignOut}>
                <span className={classes.optionText}>{t("sign_out")}</span>
              </div>
            </>
          )}

          {showThemes && (
            <>
              {themes.map((themeOption) => (
                <div
                  key={themeOption}
                  className={`${classes.option} ${theme === themeOption ? classes.selected : ""}`}
                  onClick={handleClickTheme.bind(null, themeOption)}
                >
                  <ThemeIcon theme={themeOption} /> <span className={classes.optionText}>{t(themeOption)}</span>
                </div>
              ))}
            </>
          )}
          {showLangs && (
            <>
              {langOptions.map((langOption) => (
                <div
                  key={langOption.id}
                  className={`${classes.option} ${router.locale === langOption.id ? classes.selected : ""}`}
                  onClick={handleClickLang.bind(null, langOption)}
                >
                  <span className={classes.optionText}>{langOption.label}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountDropDown;

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "auto") return <ThemeAutoIcon className={classes.themeIcon} />;
  else if (theme === "dark") return <ThemeDarkIcon className={classes.themeIcon} />;
  else return <ThemeLightIcon className={classes.themeIcon} />;
}
