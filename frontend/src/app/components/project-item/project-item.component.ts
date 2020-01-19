//#region Imports

import { Component, Input } from '@angular/core';

import { ShellItem } from '../../models/interfaces/shell-item';
import { ProjectProxy } from '../../models/proxies/project.proxy';

//#endregion

//#region Component

@Component({
  selector: 'app-project-item',
  templateUrl: 'project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})

//#endregion

/**
 * A classe que é responsável por exibir as informações de um projeto
 */
export class ProjectItemComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() {}

  //#endregion

  //#region Inputs

  /**
   * As informações de conteúdo desse componente
   */
  @Input()
  public content: Partial<ProjectProxy> & ShellItem;

  //#endregion

}
