import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1786028851108 implements MigrationInterface {
    name = 'InitialSchema1786028851108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."experience_type_enum" AS ENUM('project', 'work', 'education')`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "name" character varying(36) NOT NULL, "description" character varying NOT NULL, "technologies" character varying NOT NULL, "date" character varying NOT NULL, "url_deploy" character varying NOT NULL, "image_url" character varying NOT NULL, "logo_url" character varying NOT NULL, "type" "public"."experience_type_enum" NOT NULL, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying NOT NULL, "year" character varying NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aboutMe" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "rol" character varying(100) NOT NULL, "description" character varying NOT NULL, "image" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_625e8bf86b5c3acfc2b844a10bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contactMessages" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9886098eb7e0ea58c5587137be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contactMessages"`);
        await queryRunner.query(`DROP TABLE "aboutMe"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TYPE "public"."experience_type_enum"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
