import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { JwtAuthGaurd } from './common/gaurds/jwtAuth.gaurd';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_NAME', useValue: 'Dekube API' },
    { provide: 'APP_VERSION', useValue: '1.0.0' },
    { provide: 'APP_DESCRIPTION', useValue: 'Api for dekube application' },
    { provide: APP_GUARD, useClass: JwtAuthGaurd },
  ],
})
export class AppModule {}
