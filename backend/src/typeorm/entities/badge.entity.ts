//#region Imports

import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../models/base/base-entity';
import { ProjectEntity } from './project.entity';

//#endregion

/**
 * A classe que representa as informações de uma Badge
 */
@Entity()
export class BadgeEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<BadgeEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O nome para essa insignia
   */
  @Column({ nullable: false, default: '-' })
  name: string;

  /**
   * A imagem do projeto
   */
  @Column({ nullable: false })
  imageUrl: string;

  /**
   * O texto alternativo para a imagem do projeto
   */
  @Column({ nullable: false })
  imageAlt: string;

  /**
   * A lista de projetos que essa insigna possui
   */
  @ManyToMany(() => ProjectEntity, project => project.badges)
  projects: ProjectEntity[];

}
