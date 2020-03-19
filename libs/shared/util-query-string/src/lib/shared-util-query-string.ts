export function convertQueryStringToObj(queryString: string): Record<string, string> {
  const keyValuesPairs = queryString.split('&');

  return keyValuesPairs.reduce((obj, keyValuePair) => {
    const [key, value] = keyValuePair.split('=');
    return { ...obj, [key]: value };
  }, {});
}
