export const subtractDaysFromDate = (date: Date, days: number): Date => {
  const day = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() - day * days);
};
