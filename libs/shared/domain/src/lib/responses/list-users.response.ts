import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { IResponse } from './response.interface';

export type ListUsersResponse = IResponse<UserStatistics[], null>;
