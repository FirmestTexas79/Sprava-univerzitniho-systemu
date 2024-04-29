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
    if (!time) return ""; // Handle null time
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  static formatDay(day?: number | null) {
    if(day === null || day === undefined) return "";

    return this.DAYS_OPTIONS.find((value) => value.value === day)?.label ?? "";
  }

  static isDateInRange(date: Date, range: Date[]): boolean {
    if (range.length !== 2) return false;

    return date >= range[0] && date <= range[1];
  }
}
