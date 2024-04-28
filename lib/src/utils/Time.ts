export class Time {

  static readonly DAYS_OPTIONS = [
    {
      value: 0,
      label: "Pondělí",
    },
    {
      value: 1,
      label: "Úterý",
    },
    {
      value: 2,
      label: "Středa",
    },
    {
      value: 3,
      label: "Čtvrtek",
    },
    {
      value: 4,
      label: "Pátek",
    },
    {
      value: 5,
      label: "Sobota",
    },
    {
      value: 6,
      label: "Neděle",
    },
  ];

  static formatDateTimeRange(start: Date, end: Date): string {
    return `${Time.formatDateTime(start)} - ${Time.formatDateTime(end)}`;
  }

  static formatDateTime(date: Date): string {
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getHours()}:${date.getMinutes()}`;
  }

  static formatTimeRange(time1: Date | null, time2: Date | null) {
    return `${Time.formatTime(time1)} - ${Time.formatTime(time2)}`;
  }

  static formatTime(time: Date | null) {
    return `${time?.getHours()}:${time?.getMinutes()}`;
  }

  static formatDay(day?: number) {
    if(!day) return "";
    return this.DAYS_OPTIONS.find((value) => value.value === day)?.label ?? "";
  }
}
