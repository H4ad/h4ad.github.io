import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameForBadge1580674857412 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "temporary_badge_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isActive" boolean NOT NULL DEFAULT (1), "imageUrl" varchar NOT NULL, "imageAlt" varchar NOT NULL, "name" varchar NOT NULL DEFAULT ('-'))`, undefined);
    await queryRunner.query(`INSERT INTO "temporary_badge_entity"("id", "createdAt", "updatedAt", "isActive", "imageUrl", "imageAlt") SELECT "id", "createdAt", "updatedAt", "isActive", "imageUrl", "imageAlt" FROM "badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "badge_entity"`, undefined);
    await queryRunner.query(`ALTER TABLE "temporary_badge_entity" RENAME TO "badge_entity"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "badge_entity" RENAME TO "temporary_badge_entity"`, undefined);
    await queryRunner.query(`CREATE TABLE "badge_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isActive" boolean NOT NULL DEFAULT (1), "imageUrl" varchar NOT NULL, "imageAlt" varchar NOT NULL)`, undefined);
    await queryRunner.query(`INSERT INTO "badge_entity"("id", "createdAt", "updatedAt", "isActive", "imageUrl", "imageAlt") SELECT "id", "createdAt", "updatedAt", "isActive", "imageUrl", "imageAlt" FROM "temporary_badge_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "temporary_badge_entity"`, undefined);
  }

}
