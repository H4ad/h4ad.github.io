import { MigrationInterface, QueryRunner } from 'typeorm';

export class SQLiteV11579566265827 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "project_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isActive" boolean NOT NULL DEFAULT (1), "title" varchar NOT NULL, "description" varchar NOT NULL, "imageUrl" varchar NOT NULL, "imageAlt" varchar NOT NULL, "seeMoreLink" varchar NOT NULL)`, undefined);
    await queryRunner.query(`CREATE TABLE "badge_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isActive" boolean NOT NULL DEFAULT (1), "imageUrl" varchar NOT NULL, "imageAlt" varchar NOT NULL)`, undefined);
    await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isActive" boolean NOT NULL DEFAULT (1), "email" varchar NOT NULL, "password" varchar NOT NULL, "roles" varchar NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"))`, undefined);
    await queryRunner.query(`CREATE TABLE "project_entity_badges_badge_entity" ("projectEntityId" integer NOT NULL, "badgeEntityId" integer NOT NULL, PRIMARY KEY ("projectEntityId", "badgeEntityId"))`, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_fb3026769418ce246f3821a889" ON "project_entity_badges_badge_entity" ("projectEntityId") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_00e11862f4d0e5965e347cc735" ON "project_entity_badges_badge_entity" ("badgeEntityId") `, undefined);
    await queryRunner.query(`DROP INDEX "IDX_fb3026769418ce246f3821a889"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_00e11862f4d0e5965e347cc735"`, undefined);
    await queryRunner.query(`CREATE TABLE "temporary_project_entity_badges_badge_entity" ("projectEntityId" integer NOT NULL, "badgeEntityId" integer NOT NULL, CONSTRAINT "FK_fb3026769418ce246f3821a8890" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_00e11862f4d0e5965e347cc7354" FOREIGN KEY ("badgeEntityId") REFERENCES "badge_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("projectEntityId", "badgeEntityId"))`, undefined);
    await queryRunner.query(`INSERT INTO "temporary_project_entity_badges_badge_entity"("projectEntityId", "badgeEntityId") SELECT "projectEntityId", "badgeEntityId" FROM "project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`ALTER TABLE "temporary_project_entity_badges_badge_entity" RENAME TO "project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_fb3026769418ce246f3821a889" ON "project_entity_badges_badge_entity" ("projectEntityId") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_00e11862f4d0e5965e347cc735" ON "project_entity_badges_badge_entity" ("badgeEntityId") `, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_00e11862f4d0e5965e347cc735"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_fb3026769418ce246f3821a889"`, undefined);
    await queryRunner.query(`ALTER TABLE "project_entity_badges_badge_entity" RENAME TO "temporary_project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`CREATE TABLE "project_entity_badges_badge_entity" ("projectEntityId" integer NOT NULL, "badgeEntityId" integer NOT NULL, PRIMARY KEY ("projectEntityId", "badgeEntityId"))`, undefined);
    await queryRunner.query(`INSERT INTO "project_entity_badges_badge_entity"("projectEntityId", "badgeEntityId") SELECT "projectEntityId", "badgeEntityId" FROM "temporary_project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "temporary_project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_00e11862f4d0e5965e347cc735" ON "project_entity_badges_badge_entity" ("badgeEntityId") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_fb3026769418ce246f3821a889" ON "project_entity_badges_badge_entity" ("projectEntityId") `, undefined);
    await queryRunner.query(`DROP INDEX "IDX_00e11862f4d0e5965e347cc735"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_fb3026769418ce246f3821a889"`, undefined);
    await queryRunner.query(`DROP TABLE "project_entity_badges_badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "user_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "project_entity"`, undefined);
  }

}
