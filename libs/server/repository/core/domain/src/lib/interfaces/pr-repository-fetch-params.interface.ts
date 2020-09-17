import { PrState } from '../enums/pr-state.enum';

export interface PrRepositoryFetchParams {
  prState?: PrState;
  page?: number;
  onPage?: number;
}
