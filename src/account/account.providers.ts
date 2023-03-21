import constants from 'src/common/constants';
import { Account } from './entities/account.entity';

export const accountProviders = [
  {
    provide: constants.ACCOUNT_REPOSITORY,
    useValue: Account,
  },
];
