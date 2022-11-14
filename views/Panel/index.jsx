import Links from "@views/Panel/Links";
import Router, { useRouter } from "next/router";
import classes from "./style.module.scss";
import PanelNavbar from "@components/PanelNavbar";
import { useEffect } from "react";
import http from "services/http.service";
import { apiUrl } from "config";
import { useDispatch } from "react-redux";
import { setPage } from "store/panelSlice";
import Appearance from "./Appearance";
import LinkView from "@views/LinkView";
import { useSelector } from "react-redux";
import Settings from "./Settings";

function PanelView() {
  const page = useSelector((state) => state.panel.page);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    http
      .getWithAuth(`${apiUrl}/page/withAuth`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          dispatch(setPage(res.data.page));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady && !router.query.tab) Router.push("/panel/links");
  }, [router.query.tab, router.isReady]);

  return (
    <div className={classes.panel}>
      <PanelNavbar />
      {page && (
        <main className={classes.panelContent}>
          <div className={classes.settings}>
            {router.query.tab == "links" && <Links />}
            {router.query.tab == "appearance" && <Appearance />}
            {router.query.tab == "settings" && <Settings />}
          </div>
          <div className={classes.demo}>
            <div className={classes.demoContentWrapper}>
              <div className={classes.demoContent}>
                <LinkView page={page} isInPanel={true} />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default PanelView;
