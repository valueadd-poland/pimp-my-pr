import { IResponse } from './response.interface';
import { UserStatistics } from '@pimp-my-pr/shared/domain';

export type ListUsersResponse = IResponse<UserStatistics[], null>;
