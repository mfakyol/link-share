import { apiUrl } from "config";
import Popup from "@components/Popup";
import http from "services/http.service";
import classes from "./style.module.scss";
import { useDispatch } from "react-redux";
import Input from "@components/_commons/Input";
import Label from "@components/_commons/Label";
import { setPageSocials } from "store/panelSlice";
import { useCallback, useState, useRef } from "react";
import FormButton from "@components/_commons/FormComponents/FormButton";
import FormError from "@components/_commons/FormComponents/FormError";

function AddOrEditSocialPopup({ social, setSocial, isEdit = false, onBack }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleOnChange = useCallback(
    (e) => {
      if (social.hrefValidations.some((hrefValidation) => e.target.value.startsWith(hrefValidation))) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    },
    [social]
  );

  const handleOnClick = useCallback(() => {
    setLoading(true);
    if (isEdit) {
      http.postWithAuth;
    } else {
      http
        .postWithAuth(`${apiUrl}/social`, {
          body: {
            type: social.type,
            href: inputRef.current.value,
          },
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status) {
            dispatch(setPageSocials(res.socials));
            setSocial(undefined);
          } else {
            setError(res.message);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, social, dispatch, setSocial]);

  return (
    <Popup
      show={social}
      onBack={onBack}
      onClose={() => setSocial(undefined)}
      title={`${isEdit ? "Edit" : "Add"} ${social?.name || "Social"} Icon`}
    >
      <div className={classes.socialList}>
        {error && <FormError error={error} setError={setError} />}
        <Label htmlFor="url">{`${social?.name} Url:`}</Label>
        <Input
          id="url"
          name="url"
          ref={inputRef}
          placeholder={social?.hrefValidations?.[0]}
          onChange={handleOnChange}
        />
        <FormButton disabled={disabled || loading} onClick={handleOnClick}>{`${isEdit ? "Edit" : "Add"} ${
          social?.name
        } Icon`}</FormButton>
      </div>
    </Popup>
  );
}

export default AddOrEditSocialPopup;
