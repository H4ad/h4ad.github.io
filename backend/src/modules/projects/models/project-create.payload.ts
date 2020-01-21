//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsString, IsUrl } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';
import { ProjectCreateBadgePayload } from './project-create-badge.payload';

//#endregion

/**
 * A classe que representa as informações de um projeto enviados pelo cliente para cadastrar um novo projeto
 */
export class ProjectCreatePayload {

  /**
   * O titulo do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o título do projeto.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  title: string;

  /**
   * A descrição do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar a descrição do projeto.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  description: string;

  /**
   * A imagem do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o url da imagem desse projeto.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({}, { message: DefaultValidationMessages.IsUrl })
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o texto alternativo para a imagem do projeto.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  imageAlt: string;

  /**
   * O link para ver mais informações
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o link de ver mais do projeto.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({}, { message: DefaultValidationMessages.IsUrl })
  seeMoreLink: string;

  /**
   * A lista com as Badges desse projeto
   */
  @ApiModelProperty({ isArray: true, type: ProjectCreateBadgePayload })
  @ArrayNotEmpty({ message: 'É necessário enviar ao menos uma insignia.' })
  @IsDefined({ message: 'É necessário associar alguma insignia para esse projeto.' })
  @Type(() => ProjectCreateBadgePayload)
  badges: ProjectCreateBadgePayload[];

}
