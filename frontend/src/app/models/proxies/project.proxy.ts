//#region Imports

import { BadgeProxy } from './badge.proxy';

//#endregion

/**
 * A classe que representa as informações de um projeto enviado pela API
 */
export interface ProjectProxy {

  /**
   * O titulo do projeto
   */
  title: string;

  /**
   * A descrição do projeto
   */
  description: string;

  /**
   * A imagem do projeto
   */
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  imageAlt: string;

  /**
   * O link para ver mais informações
   */
  seeMoreLink: string;

  /**
   * A lista com as Badges desse projeto
   */
  badges: BadgeProxy[];

}
