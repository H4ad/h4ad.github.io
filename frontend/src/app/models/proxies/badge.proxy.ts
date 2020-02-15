/**
 * A classe que representa as informações de uma Badge
 */
export interface BadgeProxy {

  /**
   * A identificação da insignia
   */
  id: number;

  /**
   * O nome dessa insignia
   */
  name: string;

  /**
   * A imagem do projeto
   */
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  imageAlt: string;

}
