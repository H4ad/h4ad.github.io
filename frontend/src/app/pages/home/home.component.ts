//#region Imports

import { Component } from '@angular/core';

import { getShellProjects } from '../../interactors/project/project.mockup';
import { ShellItem } from '../../models/interfaces/shell-item';
import { BadgeProxy } from '../../models/proxies/badge.proxy';
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

  //#region Private Properties

  /**
   * A lista com todos os projetos
   */
  private allProjects: Array<Partial<ProjectProxy> & ShellItem> = [];

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

  /**
   * A lista de insignias que será usada para funcionar como menu para selecionar e filtrar os projetos
   */
  public badges: BadgeProxy[] = [];

  /**
   * Diz qual é a identificação do tipo de projeto que está selecionado
   */
  public selectedProjectType: number = -1;

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado quando esse componente é iniciado
   */
  public async ngOnInit(): Promise<void> {
    const [{ success: projects }, { success: badges }] = await Promise.all([this.projectService.getProjects(), this.projectService.getBadges()]);

    if (!badges || !projects)
      return;

    this.badges = badges;

    const shellProjects: Array<Partial<ProjectProxy> & ShellItem> = [];

    for (let i = 0; i < projects.length; i++) {
      const shellProject = this.projectList[i] || { shellId: +new Date(), isShellState: false };
      const project = { ...projects[i], ...shellProject, isShellState: false };

      shellProjects.push(project);
    }

    this.allProjects = shellProjects;
    this.projectList = this.allProjects;
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

  /**
   * Método que retorna uma identificação para que o ngFor possa atualizar itens sem destruir toda a arvore HTML
   *
   * @param index O indice desse item
   * @param item As informações do elemento
   */
  public trackById(index: number, item: { id: number }): number {
    return item.id;
  }

  /**
   * Método que é executado ao clicar em algum tipo de projeto
   *
   * @param badgeId A identificação da insignia
   */
  public onClickProjectType(badgeId: number): void {
    this.projectList = this.allProjects.filter(project => badgeId === -1 || project.badges.some(badge => badge.id === badgeId));
    this.selectedProjectType = badgeId;
  }

  //#endregion

}
