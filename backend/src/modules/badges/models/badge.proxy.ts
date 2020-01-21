//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { BadgeEntity } from '../../../typeorm/entities/badge.entity';
import { ProjectEntity } from '../../../typeorm/entities/project.entity';
import { ProjectProxy } from '../../projects/models/project.proxy';

//#endregion

/**
 * A classe que representa as informações de uma insignia enviadas pela API
 */
export class BadgeProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<BadgeEntity> | BadgeEntity) {
    super(partial);

    this.imageUrl = partial.imageUrl;
    this.imageAlt = partial.imageAlt;
    this.projects = (Array.isArray(partial.projects) ? partial.projects : []).map(({ badges, ...project }) => new ProjectProxy(project));
  }

  //#endregion

  /**
   * A imagem do projeto
   */
  @ApiModelProperty()
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelProperty()
  imageAlt: string;

  /**
   * A lista de projetos que essa insigna possui
   */
  @ApiModelProperty({ type: () => ProjectProxy, isArray: true })
  @Type(() => ProjectProxy)
  projects: ProjectProxy[];

}
