import { URL } from 'url';

const allowedDomains = ['github', 'bitbucket', 'gitlab'];

function isHostAllowed(host: string): boolean {
  return allowedDomains.reduce((accumulator, currentValue) => {
    if (accumulator) return accumulator;
    return host.includes(currentValue);
  }, false);
}

export function extractFullName(repoUrl: string): string {
  const url = new URL(repoUrl);
  if (isHostAllowed(url.host)) {
    const pathArr = url.pathname.slice(1).split('/');
    if (pathArr.length > 1) {
      return `${pathArr[0]}/${pathArr[1]}`;
    }
  }
  return '';
}
