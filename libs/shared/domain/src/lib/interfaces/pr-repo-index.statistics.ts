import { PrAuthor } from './pr-author.interface';
import { PrReviewer } from './pr-reviewer.interface';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

export interface PrRepoIndexStatistics extends PrStatistics {
  repositoryIndex: number;
}
