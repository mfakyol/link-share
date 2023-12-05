import classes from "./styles.module.scss";
import { Dispatch, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCalendarData,
  isDate,
  isInRange,
  CalendarDate,
  sortCalendarDates,
  isSameCalendarDate,
  dateToCalendarDate,
  calendarDateToString,
  getShortWeekDay,
  getLongCalendarMonth,
  isSameCalendarMonth,
  zeroPad,
  calendarDateToDate,
} from "@/utils/calendar";
import ArrowIcon from "@/icons/ArrowIcon";
import TextInput from "../TextInput";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";

const rowIndexes = [0, 1, 2, 3, 4, 5];
const colIndexes = [0, 1, 2, 3, 4, 5, 6];

interface CalendarProps {
  isRange: boolean;
  value?: [Date, Date] | [Date] | Date;
  onDateChanged?(date: [Date, Date] | Date): void;
}

type DateState = { current: Date | null; month: number; year: number };
type Today = { date: Date; calendarDate: CalendarDate };
type SelectedDates = [CalendarDate, CalendarDate] | [CalendarDate] | [];

export default function Calendar({ value, isRange = false, onDateChanged }: CalendarProps) {
  const calendarRef = useRef(null);
  const { locale } = useRouter();
  const [show, setShow] = useState(false);
  const [today, setToday] = useState<Today>({ date: new Date(), calendarDate: dateToCalendarDate(new Date()) });
  const [dateState, setDateState] = useState<DateState>({ current: today.date, month: today.date.getMonth(), year: today.date.getFullYear() });
  const [selectedDates, setSelectedDates] = useState<SelectedDates>([]);

  useOnClickOutside(calendarRef, setShow.bind(null, false), show);

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        let dates: SelectedDates = [];
        if (value[0]) {
          dates.push(dateToCalendarDate(value[0]) as never);
          addDateToState(value[0]);
        }
        if (value[1]) dates.push(dateToCalendarDate(value[1]) as never);
        setSelectedDates(dates);
      } else {
        addDateToState(value);
        setSelectedDates([dateToCalendarDate(value)]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addDateToState = (date: Date | [Date, Date] | undefined) => {
    const isDateObject = date && isDate(date as Date);
    const _date = isDateObject ? (date as Date) : new Date();
    setDateState({
      current: isDateObject ? _date : null,
      month: +_date.getMonth(),
      year: _date.getFullYear(),
    });
  };

  const handleClickDate = useCallback(
    (date: CalendarDate) => {
      setSelectedDates((prev) => {
        if (isRange && prev[0] && !prev[1]) {
          onDateChanged?.([calendarDateToDate(prev[0]), calendarDateToDate(date)]);
          return [prev[0], date];
        } else {
          onDateChanged?.(calendarDateToDate(date));
          return [date];
        }
      });
    },
    [setSelectedDates, isRange, onDateChanged]
  );

  return (
    <div className={classes.wrapper} ref={calendarRef}>
      <TextInput
        wrapperClassName={classes.input}
        value={selectedDates.map((d) => calendarDateToString(d, locale as Lang)).join(" - ")}
        readOnly={true}
        onFocus={setShow.bind(null, true)}
        onClick={setShow.bind(null, show)}
      />
      {show && (
        <div className={classes.calendar}>
          <CalendarHeader dateState={dateState} setDateState={setDateState} lang={locale as Lang} />
          <CalendarGrid
            today={today}
            isRange={isRange}
            dateState={dateState}
            selectedDates={selectedDates}
            onClickDate={handleClickDate}
            lang={locale as Lang}
          />
        </div>
      )}
    </div>
  );
}

interface CalendarHeaderProps {
  dateState: DateState;
  setDateState: Dispatch<React.SetStateAction<DateState>>;
  lang: Lang;
}

function CalendarHeader({ dateState, setDateState, lang }: CalendarHeaderProps) {
  const { month, year } = dateState;
  const monthName = getLongCalendarMonth(month, lang);

  const handleClickArrow = (direction: "left" | "right") => {
    setDateState((prev) => {
      let { current, month, year } = prev;

      if (direction === "left") {
        month = --month;
        if (month < 0) {
          --year;
          month = 11;
        }
      } else {
        ++month;
        if (month > 11) {
          ++year;
          month = 0;
        }
      }

      return { current, month, year };
    });
  };

  return (
    <div className={classes.calendarHeader}>
      <div className={`${classes.arrow} ${classes.arrowLeft}`} onClick={handleClickArrow.bind(null, "left")}>
        <ArrowIcon className={classes.arrowIcon} />
      </div>
      <div className={classes.label}>
        {monthName} {year}
      </div>
      <div className={`${classes.arrow} ${classes.arrowRight}`} onClick={handleClickArrow.bind(null, "right")}>
        <ArrowIcon className={classes.arrowIcon} />
      </div>
    </div>
  );
}

interface CalendarGridProps {
  isRange: boolean;
  today: Today;
  dateState: DateState;
  minDate?: Date;
  maxDate?: Date;
  onClickDate(date: CalendarDate): void;
  selectedDates: SelectedDates;
  lang: Lang;
}

function CalendarGrid({ isRange, today, dateState, onClickDate, selectedDates, lang }: CalendarGridProps) {
  const [inRageDates, setInRageDates] = useState<[CalendarDate, CalendarDate] | []>([]);

  const calendarDates = useMemo(() => {
    const { month, year } = dateState;
    return getCalendarData(month, year);
  }, [dateState]);

  const handleMouseEnter = useCallback(
    (date: CalendarDate) => {
      if (isRange && selectedDates[0] && !selectedDates[1]) {
        if (isSameCalendarDate(date, selectedDates[0])) setInRageDates([]);
        let isSmaller = true;
        if (date[0] > selectedDates[0][0]) isSmaller = false;
        else if (date[0] === selectedDates[0][0] && date[1] > selectedDates[0][1]) isSmaller = false;
        else if (date[0] === selectedDates[0][0] && date[1] === selectedDates[0][1] && date[2] > selectedDates[0][1]) isSmaller = false;
        if (isSmaller) setInRageDates([date, selectedDates[0]]);
        else setInRageDates([selectedDates[0], date]);
      }
    },
    [isRange, selectedDates]
  );

  const getCellClassName = (calendarDate: CalendarDate) => {
    let className = `${classes.cell}${isSameCalendarDate(calendarDate, today.calendarDate) ? ` ${classes.today}` : ""}${
      isRange ? ` ${classes.range}` : ""
    }${isSameCalendarMonth(calendarDate, [dateState.year, dateState.month, 1]) ? "" : ` ${classes.notSameMonth}`}`;
    const isSelected = selectedDates.some((s) => isSameCalendarDate(s, calendarDate));
    if (isSelected) className = `${className} ${classes.selected}`;
    if ((inRageDates[0] && inRageDates[1]) || (selectedDates[0] && selectedDates[1])) {
      const sortedInRangeDates = sortCalendarDates(...(selectedDates[0] && selectedDates[1] ? selectedDates : inRageDates));
      if (isInRange(sortedInRangeDates[0], sortedInRangeDates[1], calendarDate)) {
        if ((isSameCalendarDate(calendarDate, sortedInRangeDates[0]) || isSameCalendarDate(calendarDate, sortedInRangeDates[1])) && !isSelected) {
          className = `${className} ${classes.selected} ${classes.inRange}`;
        } else className = `${className} ${classes.inRange}`;
      }
    }

    return className;
  };

  return (
    <div className={classes.calendarGrid}>
      <div className={classes.weekDays}>
        {[0, 1, 2, 3, 4, 5, 6].map((key) => (
          <span className={classes.weekDay} key={key}>
            {getShortWeekDay(key, lang)}
          </span>
        ))}
      </div>
      {rowIndexes.map((rowIndex) => (
        <div key={rowIndex} className={classes.row}>
          {colIndexes.map((colIndex) => (
            <CalendarCell
              key={colIndex}
              calendarDate={calendarDates[rowIndex * 7 + colIndex]}
              onClick={onClickDate}
              onMouseEnter={handleMouseEnter}
              className={getCellClassName(calendarDates[rowIndex * 7 + colIndex])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface CalendarCellProps {
  calendarDate: CalendarDate;
  onClick(date: CalendarDate): void;
  onMouseEnter(date: CalendarDate): void;
  className: string;
}

function CalendarCell({ calendarDate, className, onClick, onMouseEnter }: CalendarCellProps) {
  return (
    <div className={className} onClick={onClick.bind(null, calendarDate)} onMouseEnter={onMouseEnter.bind(null, calendarDate)}>
      {zeroPad(calendarDate[2], 2)}
    </div>
  );
}
