import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AccountExistsGaurd implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { email } = request.body;
    const account = await this.accountService.findOneByEmail(email);

    if (account) {
      throw new ForbiddenException('Email Already in use');
    }

    return true;
  }
}
