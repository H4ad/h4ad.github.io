//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUrl } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações para a criação de uma insignia
 */
export class BadgeCreatePayload {

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
