//#region Imports

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import { ProjectEntity } from '../../../typeorm/entities/project.entity';

//#endregion

/**
 * A classe que representa o serviço que lida com os meus projetos
 */
@Injectable()
export class ProjectService extends TypeOrmCrudService<ProjectEntity> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @InjectRepository(ProjectEntity) public repository: Repository<ProjectEntity>,
  ) {
    super(repository);
  }

  //#endregion

}
