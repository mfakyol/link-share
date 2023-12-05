import datePickerTranslations from "@/constants/datePickerTranslations";

export type CalendarDate = [number, number, number];

// (int) The current year
export const THIS_YEAR = +new Date().getFullYear();
// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;
// Week days names and shortnames
export const SHORT_WEEK_DAYS = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};
// Calendar months names and short names
export const SHORT_CALENDAR_MONTHS = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
};
export const LONG_CALENDAR_MONTHS = {
  0: "january",
  1: "february",
  2: "march",
  3: "april",
  4: "mayLong",
  5: "june",
  6: "july",
  7: "august",
  8: "september",
  9: "october",
  10: "november",
  11: "december",
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

export function zeroPad(value: number, length: number) {
  return `${value}`.padStart(length, "0");
}

export function getMonthDays(month: number, year: number) {
  const months30 = [3, 5, 8, 10];
  const leapYear = year % 4 === 0;
  return month === 1 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31;
}

export function getMonthFirstDay(month: number, year: number) {
  return new Date(`${year}-${zeroPad(month + 1, 2)}-01`).getDay() + 1;
}

export function addDaysToDate(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function addMonthsToDate(date: Date, months: number) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

export function addYearsToDate(date: Date, years: number) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

export function isDate(date: Date) {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

export function isSameCalendarMonth(d1: CalendarDate, d2: CalendarDate) {
  return d1[0] === d2[0] && d1[1] === d2[1];
}

export function isSameCalendarDate(d1: CalendarDate, d2: CalendarDate) {
  if (!d1 || !d2) return false;
  return calendarDateToDate(d1).getTime() === calendarDateToDate(d2).getTime();
}

export function dateToCalendarDate(date: Date) {
  return [date.getFullYear(), date.getMonth(), date.getDate()] as CalendarDate;
}
export function calendarDateToDate(calendarDate: CalendarDate) {
  return new Date(calendarDate[0], calendarDate[1], calendarDate[2]);
}

export function sortCalendarDates(...calendarDates: CalendarDate[]) {
  return calendarDates.sort((d1, d2) => calendarDateToDate(d1).getTime() - calendarDateToDate(d2).getTime());
}

export function isInRange(startCalendarDate: CalendarDate, endCalendarDate: CalendarDate, calendarDate: CalendarDate) {
  const startTime = calendarDateToDate(startCalendarDate).getTime();
  const endTime = calendarDateToDate(endCalendarDate).getTime();
  const calendarTime = calendarDateToDate(calendarDate).getTime();
  return startTime <= calendarTime && endTime >= calendarTime;
}

export function getShortWeekDay(weekDay: number, lang: Lang) {
  const shortWeekKey = SHORT_WEEK_DAYS[weekDay as keyof typeof SHORT_WEEK_DAYS];
  return datePickerTranslations[lang][shortWeekKey] || shortWeekKey;
}

export function getShortCalendarMonth(month: number, lang: Lang) {
  const shortMonthKey = SHORT_CALENDAR_MONTHS[month as keyof typeof SHORT_CALENDAR_MONTHS];
  return datePickerTranslations[lang][shortMonthKey] || shortMonthKey;
}

export function getLongCalendarMonth(month: number, lang: Lang) {
  const longMonthKey = LONG_CALENDAR_MONTHS[month as keyof typeof LONG_CALENDAR_MONTHS];
  return datePickerTranslations[lang][longMonthKey] || longMonthKey;
}

export function calendarDateToString(calendarDate: CalendarDate, lang: Lang = "en") {
  return `${zeroPad(calendarDate[2], 2)} ${getShortCalendarMonth(calendarDate[1], lang)} ${calendarDate[0]}`;
}

export function getDateISO(date: Date) {
  if (!isDate(date)) return null;
  return [date.getFullYear(), +date.getMonth() + 1, +date.getDate()].join("-");
}

export function getPreviousMonth(month: number, year: number) {
  const prevMonth = month > 0 ? month - 1 : 11;
  const prevMonthYear = month > 0 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
}

export function getNextMonth(month: number, year: number) {
  const nextMonth = month < 11 ? month + 1 : 0;
  const nextMonthYear = month < 11 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
}

export function getCalendarData(month: number, year: number) {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, prevMonth, day];
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, month, day];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, nextMonth, day];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates] as CalendarDate[];
}
