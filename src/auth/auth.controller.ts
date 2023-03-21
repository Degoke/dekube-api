import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGaurd } from 'src/common/gaurds/localAuth.gaurd';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateAccountDto) {
    return await this.authService.create(user);
  }
}
