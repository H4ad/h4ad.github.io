//#region Imports

import { ShellItem } from '../../models/interfaces/shell-item';
import { ProjectProxy } from '../../models/proxies/project.proxy';
import { AsyncResult } from '../../services/http-async/http-async.service';
import { delay, noRef } from '../../utils/functions';

//#endregion

/**
 * Método que retorna os projetos no modo concha
 */
export function getShellProjects(): Array<Partial<ProjectProxy> & ShellItem> {
  return new Array(1).fill({
    shellId: +new Date(),
    isShellState: true,
  });
}

/**
 * Método que representa a implementação mockada do método getProjectsAPI
 */
export async function getProjectsMockup(): Promise<AsyncResult<ProjectProxy[]>> {
  await delay(500);

  return Promise.resolve(
    noRef(<AsyncResult<ProjectProxy[]>> {
      success: [
        {
          title: 'Figurinhas Senninha',
          description: 'É um aplicativo criado para o Instituto Ayrton Senna, aonde você pode jogar bafo para ganhar figurinhas, que depois você pode exportar para o WhatsApp.\n\nEle foi totalmente desenvolvido em Ionic, usando Angular como base.',
          imageUrl: '/assets/images/senninha.png',
          imageAlt: 'O icone do aplicativo Figurinhas Senninha.',
          badges: [
            {
              imageUrl: '/assets/icons/ionic_icon.png',
              imageALt: 'O icone do Ionic',
            },
            {
              imageUrl: '/assets/icons/angular_icon.png',
              imageAlt: 'O icone do Angular.',
            },
          ],
        },

      ],
    }),
  );
}
