//#region Imports

import { Component } from '@angular/core';

import { getShellProjects } from '../../interactors/project/project.mockup';
import { ShellItem } from '../../models/interfaces/shell-item';
import { ProjectProxy } from '../../models/proxies/project.proxy';
import { ProjectService } from '../../services/project/project.service';

//#endregion

/**
 * A classe que representa a página que é exibida ao entrar no site
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly projectService: ProjectService,
  ) { }

  //#endregion

  //#region Public Properties

  /**
   * A lista dos meus projetos
   */
  public projectList: Array<Partial<ProjectProxy> & ShellItem> = getShellProjects();

  /**
   * Diz se deve exibir o menu
   */
  public shouldShowMenu: boolean = false;

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void> {
    const { error, success: projects } = await this.projectService.getProjects();

    if (error)
      return;

    const shellProjects: Array<Partial<ProjectProxy> & ShellItem> = [];

    for (let i = 0; i < projects.length; i++) {
      const shellProject = this.projectList[i] || { shellId: +new Date(), isShellState: false };
      const project = { ...projects[i], ...shellProject, isShellState: false };

      shellProjects.push(project);
    }

    this.projectList = shellProjects;
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna uma identificação para que o ngFor possa atualizar itens sem destruir toda a arvore HTML
   *
   * @param index O indice desse item
   * @param shellItem As informações do elemento shell
   */
  public trackByShellId(index: number, shellItem: ShellItem): number {
    return shellItem.shellId;
  }

  //#endregion

}
