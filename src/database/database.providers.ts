import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/account/entities/account.entity';
import constants from 'src/common/constants';

export const databaseProviders = [
  {
    provide: constants.SEQUELIZE,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('database.postgres.host'),
        port: configService.get('dtabase.postgres.port'),
        username: configService.get('database.postgres.username'),
        password: configService.get('database.postgres.password'),
        database: configService.get('database.postgres.database'),
      });
      sequelize.addModels([Account]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
