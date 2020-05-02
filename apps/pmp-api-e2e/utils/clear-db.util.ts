import { getConnection } from 'typeorm';

export async function clearDb(): Promise<void> {
  await getConnection().synchronize(true);
}
