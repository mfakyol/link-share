import Card from "@/components/common/Card";
import classes from "./styles.module.scss";
import { useTranslation } from "@/contexts/TranslationContext";
import TextInput from "@/components/common/TextInput";
import Label from "@/components/common/Label";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import Loading from "@/components/common/Loading";

function MyAccountContent() {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState<AccounData>();

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const response = await userService.getAccountData();
      if (response.status) {
        setAccountData(response.data);
      } else {
        // will show error
      }
      setLoading(false);
    };
    func();
  }, []);

  return (
    <main className={classes.main}>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.content}>
          <div className={classes.title}>{t("my_account")}</div>
          <Card title={t("my_data")}>
            <Label htmlFor="current-email">{t("email")}</Label>
            <TextInput id="current-email" defaultValue={accountData?.email} />
            <Button color="blue">{t("update")}</Button>
          </Card>
          <Card title={t("reset_password")}>
            <p className={classes.text}>{t("reset_password_description")}</p>
            <Button color="blue">{t("reset_password")}</Button>
          </Card>
          <Card title={t("delete_account")}>
            <p className={classes.text}>{t("delete_account_description")}</p>
            <Button color="red">{t("delete_account")}</Button>
          </Card>
        </div>
      )}
    </main>
  );
}

export default MyAccountContent;
