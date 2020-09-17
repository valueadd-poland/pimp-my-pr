export const urlWithQueryParams = (
  url: string,
  queryParams: { [key: string]: number | string | boolean }
) => {
  return Object.entries(queryParams).reduce((total, current, ind, arr) => {
    if (ind === 0) total += '?';
    total += current.join('=');
    if (ind !== arr.length - 1) total += '&';
    return total;
  }, url);
};
