//#region Imports

import { ClassSerializerInterceptor, Controller, Request, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Crud, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { isNullOrUndefined } from 'util';

import { BaseCrudController } from '../../../common/base-crud.controller';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { BadgeEntity } from '../../../typeorm/entities/badge.entity';
import { CrudProxy, mapCrud } from '../../../utils/crud';
import { NestJSRequest } from '../../../utils/type.shared';
import { BadgeCreatePayload } from '../models/badge-create.payload';
import { BadgeUpdatePayload } from '../models/badge-update.payload';
import { BadgeProxy } from '../models/badge.proxy';
import { BadgeService } from '../services/badge.service';

//#endregion

/**
 * A classe que representa o construtor que lida com as minhas insignias
 */
@ApiBearerAuth()
@Crud({
  model: {
    type: BadgeEntity,
  },
  routes: {
    exclude: [
      'updateOneBase',
      'createManyBase',
    ],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('badges')
@Controller('badges')
export class BadgeController extends BaseCrudController<BadgeEntity, BadgeService> {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    service: BadgeService,
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
  @ApiOkResponse({ type: BadgeProxy, isArray: true })
  public getMany(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<BadgeProxy>> {
    return this.base.getManyBase(crudRequest).then(response => mapCrud(BadgeProxy, response));
  }

  /**
   * Método que retorna as informações de uma entidade
   *
   * @param nestRequest As informações da requisição do NestJS
   * @param crudRequest As informações da requisição do CRUD
   */
  @Override()
  @ApiOkResponse({ type: BadgeProxy })
  public getOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<BadgeProxy>> {
    return this.base.getOneBase(crudRequest).then(response => mapCrud(BadgeProxy, response));
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
  @ApiOkResponse({ type: BadgeProxy })
  public createOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() payload: BadgeCreatePayload): Promise<CrudProxy<BadgeProxy>> {
    const entity = new BadgeEntity({
      imageUrl: payload.imageUrl,
      imageAlt: payload.imageAlt,
      name: payload.name,
    });

    return this.base.createOneBase(crudRequest, entity).then(response => mapCrud(BadgeProxy, response));
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
  @ApiOkResponse({ type: BadgeProxy })
  public replaceOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest, @ParsedBody() payload: BadgeUpdatePayload): Promise<CrudProxy<BadgeProxy>> {
    const entity = new BadgeEntity({
      id: (+nestRequest.params.id),
      ...!isNullOrUndefined(payload.imageUrl) && { imageUrl: payload.imageUrl },
      ...!isNullOrUndefined(payload.imageAlt) && { imageAlt: payload.imageAlt },
      ...!isNullOrUndefined(payload.name) && { name: payload.name },
    });

    return this.base.replaceOneBase(crudRequest, entity).then(response => mapCrud(BadgeProxy, response));
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
  public async deleteOne(@Request() nestRequest: NestJSRequest, @ParsedRequest() crudRequest: CrudRequest): Promise<CrudProxy<BadgeProxy>> {
    return this.base.deleteOneBase(crudRequest).then(response => response && mapCrud(BadgeProxy, response) || void 0);
  }

  //#endregion

}
