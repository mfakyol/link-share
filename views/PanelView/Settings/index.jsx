import classes from "./style.module.scss";
import { useSelector } from "react-redux";
import SeoSettings from "@components/SeoSettings";
import SensetiveContentSettings from "@components/SensetiveContentSettings";

function Settings() {
  const page = useSelector((state) => state.panel.page);

  return (
    <>
      <SeoSettings page={page} />
      <SensetiveContentSettings page={page}/>
    </>
  );
}

export default Settings;
