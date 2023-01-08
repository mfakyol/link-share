import Card from "@components/Card";
import classes from "./style.module.scss";
import { useCallback, useState } from "react";
import RadioButton from "@components/_commons/RadioButton";
import http from "services/http.service";
import { apiUrl } from "config";

function SensetiveContentSettings({ page }) {
  const [sensitiveContentAgeLimit, setSensitiveContentAgeLimit] = useState(page.sensitiveContentAgeLimit);

  const handleRadioButtonOnChange = useCallback((e) => {
    setSensitiveContentAgeLimit(e.target.value);
    http
      .postWithAuth(`${apiUrl}/settings/sensitiveContentAgeLimit`, {
        body: { sensitiveContentAgeLimit: e.target.value },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Card title="Sensetive Content">
      <p className={classes.sensetiveContentQuestion}>
        Is there sensitive content or do the links go to a page with sensitive content? If yes, please select the age
        restriction. If there is an age restriction, the user must confirm that they are over the age limit to view the
        page.
      </p>
      <div className={classes.radioGroup}>
        <RadioButton
          name="sensetive"
          value=""
          label="No sensetive content."
          onChange={handleRadioButtonOnChange}
          checked={!sensitiveContentAgeLimit}
        />
        <RadioButton
          name="sensetive"
          value="13"
          label="13+"
          onChange={handleRadioButtonOnChange}
          checked={sensitiveContentAgeLimit == "13"}
        />
        <RadioButton
          name="sensetive"
          value="18"
          label="18+"
          onChange={handleRadioButtonOnChange}
          checked={sensitiveContentAgeLimit == "18"}
        />
        <RadioButton
          name="sensetive"
          value="21"
          label="21+"
          onChange={handleRadioButtonOnChange}
          checked={sensitiveContentAgeLimit == "21"}
        />
        <RadioButton
          name="sensetive"
          value="25"
          label="25+"
          onChange={handleRadioButtonOnChange}
          checked={sensitiveContentAgeLimit == "25"}
        />
      </div>
    </Card>
  );
}

export default SensetiveContentSettings;
