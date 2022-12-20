import Card from "@components/Card";
import classes from "./style.module.scss";
import Label from "@components/_commons/Label";
import RadioButton from "@components/_commons/RadioButton";
import http from "services/http.service";
import { apiUrl } from "config";
import { useDispatch } from "react-redux";
import { setPageSocialPosition, setPageSocialStyle } from "store/panelSlice";

function EditSocial({ page }) {
  const dispatch = useDispatch();

  const handleOnChangePosition = async (e) => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/social/position`, { position: e.target.value });

      if (response.status) dispatch(setPageSocialPosition({ position: e.target.value }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeStyle = async (e) => {
    try {
      const response = await http.postWithAuth(`${apiUrl}/social/style`, { style: e.target.value });

      if (response.status) dispatch(setPageSocialStyle({ style: e.target.value }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card title="Social">
      <Label> Social Icons Position</Label>
      <RadioButton
        label="Top"
        value="top"
        onChange={handleOnChangePosition}
        checked={page.styles.social.position == "top"}
      />
      <RadioButton
        label="Bottom"
        value="bottom"
        onChange={handleOnChangePosition}
        checked={page.styles.social.position == "bottom"}
      />

      <Label> Social Icons Style</Label>
      <RadioButton
        label="Outline"
        value="outline"
        onChange={handleOnChangeStyle}
        checked={page.styles.social.style == "outline"}
      />
      <RadioButton
        label="Color"
        value="color"
        onChange={handleOnChangeStyle}
        checked={page.styles.social.style == "color"}
      />
    </Card>
  );
}

export default EditSocial;
