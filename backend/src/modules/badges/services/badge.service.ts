//#region Imports

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import { BadgeEntity } from '../../../typeorm/entities/badge.entity';

//#endregion

/**
 * A classe que representa o serviço que lida com as minhas insignias
 */
@Injectable()
export class BadgeService extends TypeOrmCrudService<BadgeEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(BadgeEntity) public repository: Repository<BadgeEntity>,
  ) {
    super(repository);
  }

  //#endregion

}
