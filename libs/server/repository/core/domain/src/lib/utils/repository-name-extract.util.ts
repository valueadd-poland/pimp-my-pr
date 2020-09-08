export function getOwnerFromFullRepoName(fullName: string): string {
  return fullName.split('/')[0];
}

export function getRepoNameFromFullRepoName(fullName: string): string {
  return fullName.split('/')[1];
}
