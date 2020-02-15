import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1581789340594 implements MigrationInterface {
  name = 'FirstMigration1581789340594';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "project_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, "imageAlt" character varying NOT NULL, "seeMoreLink" character varying NOT NULL, CONSTRAINT "PK_7a75a94e01d0b50bff123db1b87" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "badge_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL DEFAULT '-', "imageUrl" character varying NOT NULL, "imageAlt" character varying NOT NULL, CONSTRAINT "PK_28ffd25351866d5e5305c9b1785" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "project_entity_badges_badge_entity" ("projectEntityId" integer NOT NULL, "badgeEntityId" integer NOT NULL, CONSTRAINT "PK_fbfd409fbd7ee88e5c7359709e0" PRIMARY KEY ("projectEntityId", "badgeEntityId"))`, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_fb3026769418ce246f3821a889" ON "project_entity_badges_badge_entity" ("projectEntityId") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_00e11862f4d0e5965e347cc735" ON "project_entity_badges_badge_entity" ("badgeEntityId") `, undefined);
    await queryRunner.query(`ALTER TABLE "project_entity_badges_badge_entity" ADD CONSTRAINT "FK_fb3026769418ce246f3821a8890" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    await queryRunner.query(`ALTER TABLE "project_entity_badges_badge_entity" ADD CONSTRAINT "FK_00e11862f4d0e5965e347cc7354" FOREIGN KEY ("badgeEntityId") REFERENCES "badge_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "project_entity_badges_badge_entity" DROP CONSTRAINT "FK_00e11862f4d0e5965e347cc7354"`, undefined);
    await queryRunner.query(`ALTER TABLE "project_entity_badges_badge_entity" DROP CONSTRAINT "FK_fb3026769418ce246f3821a8890"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_00e11862f4d0e5965e347cc735"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_fb3026769418ce246f3821a889"`, undefined);
    await queryRunner.query(`DROP TABLE "project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "user_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "project_entity"`, undefined);
  }

}
