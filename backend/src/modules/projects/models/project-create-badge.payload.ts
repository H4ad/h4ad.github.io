//#region Imports

import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages';

//#endregion

/**
 * A classe que representa as informações enviadas pelo cliente para associar uma insigna a um projeto
 */
export class ProjectCreateBadgePayload {

  /**
   * A identificação de uma insignia
   */
  @ApiModelProperty()
  @IsDefined({ message: 'É necessário enviar a identificação da insignia.' })
  @IsNumber({ }, { message: DefaultValidationMessages.IsNumber })
  badgeId: number;

}
