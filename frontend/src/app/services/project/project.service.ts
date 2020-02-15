//#region  Imports

import { Injectable } from '@angular/core';

import { ProjectInteractor } from '../../interactors/project/project.interactor';
import { BadgeProxy } from '../../models/proxies/badge.proxy';
import { ProjectProxy } from '../../models/proxies/project.proxy';
import { AsyncResult } from '../http-async/http-async.service';

//#endregion

@Injectable({
  providedIn: 'root',
})
/**
 * A classe que representa o serviço que lida com os projetos
 */
export class ProjectService {

  //#region  Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly interactor: ProjectInteractor,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que busca os meus projetos
   */
  public async getProjects(): Promise<AsyncResult<ProjectProxy[]>> {
    // TODO: Implementar camada de cache para que possa recuperar do cache na segunda vez, e depois, atualizar os projetos
    return await this.interactor.getProjectsAPI();
  }

  /**
   * Método que busca todas as insignias
   */
  public async getBadges(): Promise<AsyncResult<BadgeProxy[]>> {
    return await this.interactor.getBadges();
  }

  //#endregion

}
