import DashboardHeader from "@/components/dashboard/DashboardHeader";
import pageSettingService from "@/services/pageSettingService";
import { setPageSetting } from "@/store/dashboardSlice";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinksContent from "./LinksContent";
import AppearanceContent from "./AppearanceContent";
import SettingsPage from "./SettingsContent";
import { IRootState } from "@/store";
import { domain } from "@/config";
import WallPageView from "../WallPageView";
import SocialsContent from "./SocialsContent";
import EyeOpenIcon from "@/icons/EyeOpenIcon";
import { createPortal } from "react-dom";
import Preview from "@/components/dashboard/Preview";
import SelectDasboardContent from "@/components/dashboard/SelectDasboardContent";

function DashboardView() {
  const dispatch = useDispatch();
  const pageSetting = useSelector<IRootState, PageSetting | undefined>((state) => state.dashboard.pageSetting);

  useEffect(() => {
    const func = async () => {
      const response = await pageSettingService.getPageSetting();
      if (response.status) dispatch(setPageSetting(response.data));
      else {
        // will show error
      }
    };

    func();
  }, [dispatch]);

  return (
    <div className={classes.page}>
      <DashboardHeader />
      {pageSetting ? (
        <main className={classes.main}>
          <SelectDasboardContent pageSetting={pageSetting} />
          <Preview pageSetting={pageSetting} />
        </main>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default DashboardView;

function SelectTab({ pageSetting }: { pageSetting: PageSetting }) {}
