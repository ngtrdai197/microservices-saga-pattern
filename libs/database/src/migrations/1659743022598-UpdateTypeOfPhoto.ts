import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTypeOfPhoto1659743022598 implements MigrationInterface {
    name = 'UpdateTypeOfPhoto1659743022598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_product\` DROP COLUMN \`photos\``);
        await queryRunner.query(`ALTER TABLE \`tb_product\` ADD \`photos\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_product\` DROP COLUMN \`photos\``);
        await queryRunner.query(`ALTER TABLE \`tb_product\` ADD \`photos\` varchar(255) NOT NULL`);
    }

}
