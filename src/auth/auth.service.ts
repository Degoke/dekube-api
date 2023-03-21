import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain, plainToClass, plainToInstance, serialize } from 'class-transformer';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(email: string, pass: string): Promise<any> {
    const user = await this.accountService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await this.comparePassword(pass, user.password);

    if (!isPasswordMatching) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user.toJSON();
  }

  async login(user: any) {
    const token = await this.generateToken(user);
    return {
      user,
      access_token: token,
    };
  }

  async create(user) {
    const account = await this.accountService.findOneByEmail(user.email);
    if (account) {
      throw new ForbiddenException('Email Already in use');
    }
    const hashedPassword = await this.hashPassword(user.password);
    const createdUser = await this.accountService.create({
      ...user,
      password: hashedPassword,
    });
    return this.login(createdUser.toJSON());
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async generateToken(user) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
