//#region Imports

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações para a atualização de uma insignia
 */
export class BadgeUpdatePayload {

  /**
   * O nome para essa insignia
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(10, { message: 'O nome da insignia não pode ter mais que 10 caracteres.' })
  @MinLength(1, { message: 'O nome da insignia deve ter no mínimo 1 caracter.' })
  name?: string;

  /**
   * A imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  imageUrl?: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  imageAlt?: string;

}
