//#region Imports

import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../models/base/base-entity';
import { BadgeEntity } from './badge.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os meus projetos
 */
@Entity()
export class ProjectEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<ProjectEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O titulo do projeto
   */
  @Column({ nullable: false })
  title: string;

  /**
   * A descrição do projeto
   */
  @Column({ nullable: false })
  description: string;

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
   * O link para ver mais informações
   */
  @Column({ nullable: false })
  seeMoreLink: string;

  /**
   * A lista com as Badges desse projeto
   */
  @ManyToMany(() => BadgeEntity, badge => badge.projects)
  @JoinTable()
  badges: BadgeEntity[];

}
