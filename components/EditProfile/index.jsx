import Input from "@commons/Input";
import Label from "@commons/Label";
import TextArea from "@commons/TextArea";
import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import { useCallback, useRef, useState } from "react";
import http from "services/http.service";
import { apiUrl } from "config";
import { useDispatch } from "react-redux";
import { setProfileDescription, setProfileTitle } from "store/panelSlice";
import Card from "@components/Card";

const TITLE_MAX_LENGTH = 30;
const DESCRITION_MAX_LENGTH = 160;

function EditProfile({ page }) {
  const titleRef = useRef();
  const dispatch = useDispatch();
  const descriptionRef = useRef();

  const [title, setTitle] = useState(page?.profileTitle || "");
  const [description, setDescription] = useState(page?.profileDescription || "");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleTitleChange = useCallback((e) => {
    if (e.target.value.length > TITLE_MAX_LENGTH) setTitleError("Title cannot be longer than 30 character.");
    else setTitleError("");
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    if (e.target.value.length > DESCRITION_MAX_LENGTH)
      setDescriptionError("Description cannot be longer than 80 character.");
    else setDescriptionError("");
    setDescription(e.target.value);
  }, []);

  const handleTitleOnBlur = useCallback(
    (e) => {
      if (!e.target.value) return setTitleError("Title cannot be empty");
      if (e.target.value.length > TITLE_MAX_LENGTH) return;
      if (page.profileTitle != e.target.value) {
        http
          .postWithAuth(`${apiUrl}/appearance/title`, { title: e.target.value })
          .then((res) => {
            if (res.status) dispatch(setProfileTitle(e.target.value));
            else console.log(res?.message);
          })
          .catch((e) => console.log("Unknown error occured."));
      }
    },
    [page, dispatch]
  );
  const handleDescriptionOnBlur = useCallback(
    (e) => {
      if (!e.target.value) return console.log("cannot be empty.");
      if (page.profileDescription != e.target.value) {
        http
          .postWithAuth(`${apiUrl}/appearance/description`, { description: e.target.value })
          .then((res) => {
            if (res.status) dispatch(setProfileDescription(e.target.value));
            else console.log(res?.message);
          })
          .catch((e) => console.log("Unknown error occured."));
      }
    },
    [page, dispatch]
  );

  return (
    <Card title="Profile">
      <div className={classes.avatarWrapper}>
        <span className={classes.avatarFallback}>{page.profileTitle ? page.profileTitle[0] : page.endPoint[0]}</span>
      </div>

      <Label className={classes.label} htmlFor="title">
        Title
      </Label>
      <Input
        ref={titleRef}
        value={title}
        className={classes.input}
        error={titleError}
        id="title"
        name="title"
        type="text"
        onChange={handleTitleChange}
        onBlur={handleTitleOnBlur}
      />
      <Label className={classes.label} htmlFor="description">
        Description
      </Label>
      <TextArea
        ref={descriptionRef}
        value={description}
        error={descriptionError}
        id="description"
        name="description"
        className={classes.textarea}
        onBlur={handleDescriptionOnBlur}
        onChange={handleDescriptionChange}
      ></TextArea>
      <p className={classes.descriptionLength}>{`${description.length} / ${DESCRITION_MAX_LENGTH}`}</p>
    </Card>
  );
}

export default EditProfile;
