import { useEffect } from "react";
import { IRootState } from "@/store";
import classes from "./styles.module.scss";
import Preview from "@/components/dashboard/Preview";
import { useDispatch, useSelector } from "react-redux";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SelectDasboardContent from "@/components/dashboard/SelectDasboardContent";
import { useRouter } from "next/router";
import MyAccountContent from "./MyAccountContent";
import Loading from "@/components/common/Loading";
import AnalyticsContent from "./AnalyticsContent";

function DashboardView() {
  const router = useRouter();
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

  const path = router.query?.slug?.[0];

  return (
    <div className={classes.page}>
      <DashboardHeader />
      {path === "account" ? (
        <MyAccountContent />
      ) : (
        <>
          {pageSetting ? (
            <main className={classes.main}>
              {path == "analytics" ? (
                <AnalyticsContent pageSetting={pageSetting} />
              ) : (
                <>
                  <SelectDasboardContent pageSetting={pageSetting} />
                  <Preview pageSetting={pageSetting} />
                </>
              )}
            </main>
          ) : (
            <Loading />
          )}
        </>
      )}
    </div>
  );
}

export default DashboardView;
