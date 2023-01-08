import Card from "@components/Card";
import Input from "@components/_commons/Input";
import Label from "@components/_commons/Label";
import TextArea from "@components/_commons/TextArea";
import { apiUrl } from "config";
import { useCallback, useState } from "react";
import http from "services/http.service";
import classes from "./style.module.scss";
const DESCRITION_MAX_LENGTH = 160;
const META_DESCRITION_MAX_LENGTH = 160;

function SeoSettings({ page }) {
  const [metaTitle, setMetaTitle] = useState(page.metaTitle);
  const [metaDescription, setMetaDescription] = useState(page.metaDescription);

  const handleMetaTitleOnChange = useCallback((e) => {
    let val = e.target.value;
    if (val.length > 60) val = val.slice(0, 60);
    setMetaTitle(val);
  }, []);

  const handleMetaTitlenOnBlur = useCallback(
    (e) => {
      if (e.target.value == page.metaTitle) return;
      http
        .postWithAuth(`${apiUrl}/settings/seo/metaTitle`, { body: { metaTitle: e.target.value } })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
    [page.metaTitle]
  );

  const handleMetaDescriptionChange = useCallback((e) => {
    let val = e.target.value;
    if (val.length > 160) val = val.slice(0, 160);
    setMetaDescription(val);
  }, []);

  const handleMetaDescriptionOnBlur = useCallback(
    (e) => {
      if (e.target.value == page.metaDescription) return;
      http
        .postWithAuth(`${apiUrl}/settings/seo/metaDescription`, { body: { metaDescription: e.target.value } })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
    [page.metaDescription]
  );
  return (
    <Card title="Seo">
      <Label htmlFor="meta-title">Meta Title</Label>
      <Input
        id="meta-title"
        name="meta-title"
        placeholder="Meta Title"
        value={metaTitle}
        onChange={handleMetaTitleOnChange}
        onBlur={handleMetaTitlenOnBlur}
      />
      <Label htmlFor="meta-description">Meta Description</Label>
      <TextArea
        id="meta-title"
        name="meta-title"
        placeholder="Meta Description"
        value={metaDescription}
        onChange={handleMetaDescriptionChange}
        onBlur={handleMetaDescriptionOnBlur}
      />
      <p className={classes.metaDescriptionLength}>{`${metaDescription.length} / ${META_DESCRITION_MAX_LENGTH}`}</p>
    </Card>
  );
}

export default SeoSettings;
