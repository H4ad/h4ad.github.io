import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthTokenModule } from './modules/auth-token/auth-token.module';
import { AuthModule } from './modules/auth/auth.module';
import { BadgeModule } from './modules/badges/badge.module';
import { ConfigModule } from './modules/config/config.module';
import { ProjectModule } from './modules/projects/project.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ConfigModule,
    AuthModule,
    AuthTokenModule,
    UserModule,
    BadgeModule,
    ProjectModule,
  ],
  providers: [
    ConfigModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
