import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectEntity } from '../../typeorm/entities/project.entity';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';

@Global()
@Module({
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      ProjectEntity,
    ]),
  ],
  controllers: [
    ProjectController,
  ],
  providers: [
    ProjectService,
  ],
  exports: [
    ProjectService,
  ],
})
export class ProjectModule { }
