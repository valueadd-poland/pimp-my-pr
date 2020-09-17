export const subtractMonthsFromDate = (date: Date, nofMonths: number): Date => {
  const thisMonth = date.getMonth();
  const newDate = new Date(date);
  newDate.setMonth(thisMonth - nofMonths);
  newDate.setDate(1);
  return newDate;
};
