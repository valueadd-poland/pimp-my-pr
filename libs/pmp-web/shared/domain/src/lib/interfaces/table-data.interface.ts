import { Pagination } from '@pimp-my-pr/pmp-web/shared/domain';

export class TableData<T> {
  data: T;
  pagination: Pagination;
}
