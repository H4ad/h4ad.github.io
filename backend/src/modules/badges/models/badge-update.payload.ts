//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações para a atualização de uma insignia
 */
export class BadgeUpdatePayload {

  /**
   * A imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  imageAlt: string;

}
