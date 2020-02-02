//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações para a criação de uma insignia
 */
export class BadgeCreatePayload {

  /**
   * O nome para essa insignia
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o nome dessa insignia.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(10, { message: 'O nome da insignia não pode ter mais que 10 caracteres.' })
  @MinLength(1, { message: 'O nome da insignia deve ter no mínimo 1 caracter.' })
  name: string;

  /**
   * A imagem do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o url da imagem da insignia.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @IsUrl({ }, { message: DefaultValidationMessages.IsUrl })
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar o texto altertivo da imagem da insignia.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  imageAlt: string;

}
