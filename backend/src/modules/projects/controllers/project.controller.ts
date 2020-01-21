//#region Imports

import { ClassSerializerInterceptor, Controller, Request, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { isNullOrUndefined } from 'util';

import { BaseCrudController } from '../../../common/base-crud.controller';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { BadgeEntity } from '../../../typeorm/entities/badge.entity';
import { ProjectEntity } from '../../../typeorm/entities/project.entity';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { NestJSRequest } from '../../../utils/type.shared';
import { ProjectCreatePayload } from '../models/project-create.payload';
import { ProjectUpdatePayload } from '../models/project-update.payload';
import { ProjectProxy } from '../models/project.proxy';
import { ProjectService } from '../services/project.service';

//#endregion

/**
 * A classe que representa o construtor que lida com os meus projetos
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: ProjectEntity,
  },
  query: {
    join: {
      badges: {
        eager: true,
      },
    },
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('projects')
@Controller('projects')
export class ProjectController extends BaseCrudController<ProjectEntity, ProjectService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: ProjectService,
  ) {
    super(service);
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna várias informações da entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @Override()
  @ApiOkResponse({ type: ProjectProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<ProjectProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(ProjectProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @Override()
  @ApiOkResponse({ type: ProjectProxy })
  public getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<ProjectProxy>> {
    return this.base.getOneBase(crudRequest).then(response => mapCrud(ProjectProxy, response));
  }

  /**
   * Método que cria uma nova entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a criação da entidade
   */
  @Override()
  @ProtectTo('admin')
  @ApiOkResponse({ type: ProjectProxy })
  public createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() payload: ProjectCreatePayload): Promise<CrudProxy<ProjectProxy>> {
    const entity = new ProjectEntity({
      title: payload.title,
      description: payload.description,
      imageUrl: payload.imageUrl,
      imageAlt: payload.imageAlt,
      seeMoreLink: payload.seeMoreLink,
      badges: payload.badges.map(badge => new BadgeEntity({ id: badge.badgeId })),
    });

    return this.base.createOneBase(crudRequest, entity).then(response => mapCrud(ProjectProxy, response));
  }

  /**
   * Método que atualiza uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   * @param payload As informações para a atualização da entidade
   */
  @ProtectTo('admin')
  @Override()
  @ApiOkResponse({ type: ProjectProxy })
  public replaceOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() payload: ProjectUpdatePayload): Promise<CrudProxy<ProjectProxy>> {
    const entity = new ProjectEntity({
      id: (+nestRequest.params.id),
      ...!isNullOrUndefined(payload.title) && { title: payload.title },
      ...!isNullOrUndefined(payload.description) && { description: payload.description },
      ...!isNullOrUndefined(payload.imageUrl) && { imageUrl: payload.imageUrl },
      ...!isNullOrUndefined(payload.imageAlt) && { imageAlt: payload.imageAlt },
      ...!isNullOrUndefined(payload.seeMoreLink) && { seeMoreLink: payload.seeMoreLink },
      ...!isNullOrUndefined(payload.badges) && { badges: payload.badges.map(badge => new BadgeEntity({ id: badge.badgeId })) },
    });

    return this.base.replaceOneBase(crudRequest, entity).then(response => mapCrud(ProjectProxy, response));
  }

  /**
   * Método que deleta uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @ProtectTo('admin')
  @Override()
  @ApiOkResponse({ type: undefined })
  public async deleteOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<ProjectProxy>> {
    return this.base.deleteOneBase(crudRequest).then(response => response && mapCrud(ProjectProxy, response) || void 0);
  }

  //#endregion

}
