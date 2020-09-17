export const padNumberToPlaces = (num: number, places = 2): string =>
  String(num).padStart(places, '0');
