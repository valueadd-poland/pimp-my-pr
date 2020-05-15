export function getTimeDiffInHours(date1: Date, date2 = new Date()): number {
  const diffInMiliseconds = Math.abs(date1.getTime() - date2.getTime());
  const diffInHours = diffInMiliseconds / 60 / 60 / 1000;

  return Math.round(diffInHours);
}
