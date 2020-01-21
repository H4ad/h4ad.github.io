import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BadgeEntity } from '../../typeorm/entities/badge.entity';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { BadgeController } from './controllers/badge.controller';
import { BadgeService } from './services/badge.service';

@Global()
@Module({
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      BadgeEntity,
    ]),
  ],
  controllers: [
    BadgeController,
  ],
  providers: [
    BadgeService,
  ],
  exports: [
    BadgeService,
  ],
})
export class BadgeModule { }
