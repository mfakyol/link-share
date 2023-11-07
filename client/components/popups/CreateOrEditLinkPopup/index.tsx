import { useDispatch } from "react-redux";
import classes from "./styles.module.scss";
import Popup from "@/components/common/Popup";
import Button from "@/components/common/Button";
import { setPageSetting } from "@/store/dashboardSlice";
import pageSettingService from "@/services/pageSettingService";
import TextInput, { TextInputRef } from "@/components/common/TextInput";
import { ChangeEvent, FormEventHandler, useCallback, useRef, useState } from "react";

interface CreateLinkPopupProps {
  visible: boolean;
  onClose(): void;
  link?: PageSetting["links"][number];
}

function CreateOrEditLinkPopup({ visible, link, onClose }: CreateLinkPopupProps) {
  const dispatch = useDispatch();
  const titleInputRef = useRef<TextInputRef>(null);
  const urlInputRef = useRef<TextInputRef>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      let isValid = true;
      const titleInput = titleInputRef.current;
      const urlInput = urlInputRef.current;

      const title = titleInput?.getValue() || "";
      const url = urlInput?.getValue() || "";

      if (!title) {
        isValid = false;
        titleInput?.setError("required");
      }
      if (!url) {
        isValid = false;
        urlInput?.setError("required");
      }

      if (!isValid) return;

      setIsLoading(true);
      if (link) {
        const response = await pageSettingService.updateLink({ id: link._id, title, url, isActive: link.isActive });
        if (response.status) dispatch(setPageSetting(response.data));
      } else {
        const response = await pageSettingService.addNewLink({ title, url });
        if (response.status) dispatch(setPageSetting(response.data));
      }
      setIsLoading(false);
    },
    [link, dispatch]
  );

  const handleChange = useCallback((inputName: "title" | "url", e: ChangeEvent<HTMLInputElement>) => {
    let input;
    const value = e.target.value;
    if (inputName == "title") input = titleInputRef.current;
    else input = urlInputRef.current;

    if (!value) input?.setError("required");
    else input?.setError("");
  }, []);

  return (
    <Popup visible={visible} title={link ? "Update Link" : "Create New Link"} onClose={onClose} containerClassName={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextInput ref={titleInputRef} placeholder="Title" defaultValue={link ? link.title : ""} onChange={handleChange.bind(null, "title")} />
        <TextInput ref={urlInputRef} placeholder="Url" defaultValue={link ? link.url : ""} onChange={handleChange.bind(null, "url")} />
        <Button color="blue" loading={isLoading}>
          {link ? "Update" : "Create"}
        </Button>
      </form>
    </Popup>
  );
}

export default CreateOrEditLinkPopup;
