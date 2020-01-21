//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsOptional, IsString, IsUrl } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';
import { ProjectCreateBadgePayload } from './project-create-badge.payload';

//#endregion

/**
 * A classe que representa as informações de um projeto enviados pelo cliente para atualizar um novo projeto
 */
export class ProjectUpdatePayload {

  /**
   * O titulo do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  title: string;

  /**
   * A descrição do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  description: string;

  /**
   * A imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({}, { message: DefaultValidationMessages.IsUrl })
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  imageAlt: string;

  /**
   * O link para ver mais informações
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({}, { message: DefaultValidationMessages.IsUrl })
  seeMoreLink: string;

  /**
   * A lista com as Badges desse projeto
   */
  @ApiModelPropertyOptional({ type: ProjectCreateBadgePayload, isArray: true })
  @IsOptional()
  @ArrayNotEmpty({ message: 'É necessário enviar ao menos uma insignia.' })
  @IsDefined({ message: 'É necessário associar alguma insignia para esse projeto.' })
  @Type(() => ProjectCreateBadgePayload)
  badges: ProjectCreateBadgePayload[];

}
