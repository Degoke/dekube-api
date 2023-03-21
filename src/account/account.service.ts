import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import constants from 'src/common/constants';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject(constants.ACCOUNT_REPOSITORY)
    private readonly accountRepository: typeof Account,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountRepository.create(createAccountDto);
  }

  async findOne(id: number): Promise<Account> {
    return await this.accountRepository.findOne<Account>({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<Account> {
    return await this.accountRepository.findOne<Account>({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.findAll<Account>();
  }
}
