import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { accountProviders } from './account.providers';

@Module({
  controllers: [AccountController],
  providers: [AccountService, ...accountProviders],
  exports: [AccountService],
})
export class AccountModule {}
