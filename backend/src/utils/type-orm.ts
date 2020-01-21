//#region Imports

import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';

import { BadgeEntity } from '../typeorm/entities/badge.entity';
import { ProjectEntity } from '../typeorm/entities/project.entity';
import { UserEntity } from '../typeorm/entities/user.entity';

//#endregion

/**
 * As entidades do Typeorm
 */
  // tslint:disable-next-line:ban-types
export const TypeOrmEntities: Array<Function | string | EntitySchema> = [
    UserEntity,
    ProjectEntity,
    BadgeEntity,
  ];
