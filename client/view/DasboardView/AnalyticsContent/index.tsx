import Card from "@/components/common/Card";
import classes from "./page.module.scss";
import Calendar from "@/components/common/Calendar";
import { addDaysToDate } from "@/utils/calendar";
import { useCallback, useEffect, useState } from "react";
import analyticsService from "@/services/analyticsService";

interface AnalyticsContentProps {
  pageSetting: PageSetting;
}

const counts = [
  { label: "total_view", value: 50 },
  { label: "unique_view", value: 30 },
  { label: "total_click", value: 40 },
  { label: "unique_click", value: 20 },
];

function AnalyticsContent({ pageSetting }: AnalyticsContentProps) {
  const [filterDates, setFilterDates] = useState<[Date, Date]>([addDaysToDate(new Date(), -7), new Date()]);

  useEffect(() => {
    const startDate = new Date(filterDates[0])
    startDate.setHours(0,0,0,0)
    const endDate = new Date(filterDates[1])
    endDate.setHours(23, 59, 59, 999)
    analyticsService.getRangeAnalitics(startDate.getTime(),endDate.getTime());
  }, [pageSetting.username, filterDates]);

  const handleFilterDatesChange = useCallback((dates: Date | [Date, Date] | [Date] | undefined) => {
    if (Array.isArray(dates) && dates[0] && dates[1]) {
      setFilterDates([dates[0], dates[1]]);
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <Card title="lifetime_analitics" className="">
        <div className={classes.row}>
          {counts.map((count) => (
            <div key={count.label} className={classes.col}>
              <div className={classes.label}>{count.label}</div>
              <div className={classes.value}>{count.value}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="total_analitics" className="">
        <Calendar isRange={true} value={filterDates} onDateChanged={handleFilterDatesChange} />
      </Card>
    </div>
  );
}

export default AnalyticsContent;
