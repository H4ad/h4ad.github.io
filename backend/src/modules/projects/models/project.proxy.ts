//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { ProjectEntity } from '../../../typeorm/entities/project.entity';
import { BadgeProxy } from '../../badges/models/badge.proxy';

//#endregion

/**
 * A classe que representa as informações de um projeto enviadas pela API
 */
export class ProjectProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<ProjectEntity> | ProjectEntity) {
    super(partial);

    this.title = partial.title;
    this.description = partial.description;
    this.imageUrl = partial.imageUrl;
    this.imageAlt = partial.imageAlt;
    this.seeMoreLink = partial.seeMoreLink;
    this.badges = (Array.isArray(partial.badges) ? partial.badges : []).map(({ projects, ...badge }) => new BadgeProxy(badge));
  }

  //#endregion

  /**
   * O titulo do projeto
   */
  @ApiModelProperty()
  title: string;

  /**
   * A descrição do projeto
   */
  @ApiModelProperty()
  description: string;

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
   * O link para ver mais informações
   */
  @ApiModelProperty()
  seeMoreLink: string;

  /**
   * A lista com as Badges desse projeto
   */
  @ApiModelProperty({ isArray: true, type: () => BadgeProxy })
  @Type(() => BadgeProxy)
  badges: BadgeProxy[];

}
