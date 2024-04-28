export class Time {

  static formatDateTimeRange(start: Date, end: Date): string {
    return `${Time.formatDateTime(start)} - ${Time.formatDateTime(end)}`;
  }

  static formatDateTime(date: Date): string {
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getHours()}:${date.getMinutes()}`;
  }
}
