export const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const ARABIC_WEEKDAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export function getTodayDateString(date: Date = new Date()): string {
  const dayName = ARABIC_WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const monthName = ARABIC_MONTHS[date.getMonth()];
  return `${dayName}، ${day} ${monthName}`;
}

export function getTodayShortDateString(date: Date = new Date()): string {
  const day = date.getDate();
  const monthName = ARABIC_MONTHS[date.getMonth()];
  return `${day} ${monthName}`;
}
