//#region  Imports

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ProjectProxy } from '../../models/proxies/project.proxy';
import { AsyncResult, HttpAsyncService } from '../../services/http-async/http-async.service';
import { getProjectsMockup } from './project.mockup';

//#endregion

@Injectable({
  providedIn: 'root',
})
/**
 * A classe que representa o interactor que lida com as chamadas HTTP e cache dos projetos
 */
export class ProjectInteractor {

  //#region  Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpAsyncService,
  ) { }

  //#endregion

  //#region Http Methods

  /**
   * Método que busca os meus projetos
   */
  public async getProjectsAPI(): Promise<AsyncResult<ProjectProxy[]>> {
    if (environment.isMockupEnabled)
      return await getProjectsMockup();

    return await this.http.get<ProjectProxy[]>(environment.api.getProjects);
  }

  //#endregion

}
