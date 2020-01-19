/**
 * A interface que representa as informações de um item em concha
 */
export interface ShellItem {

  /**
   * Diz se esse está no modo de concha
   */
  isShellState: boolean;

  /**
   * O id para essa concha usado no ngFor para manter o HTML apenas alterando os valores
   */
  shellId: number;

}
