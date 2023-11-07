 import SensitiveContentCard from '@/components/dashboard/SensitiveContentCard';
import classes from './styles.module.scss'
import SeoCard from '@/components/dashboard/SeoCard';

 interface SettingsPageProps {
  pageSetting:PageSetting
 }

function SettingsPage({ pageSetting}: SettingsPageProps) {
  return <div className={classes.wrapper}>
    <SensitiveContentCard pageSetting={pageSetting}/>
    <SeoCard pageSetting={pageSetting}/>
  </div>;
}

export default SettingsPage;
