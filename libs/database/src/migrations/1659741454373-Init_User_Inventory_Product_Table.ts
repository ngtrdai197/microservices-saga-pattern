import {MigrationInterface, QueryRunner} from "typeorm";

export class InitUserInventoryProductTable1659741454373 implements MigrationInterface {
    name = 'InitUserInventoryProductTable1659741454373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_inventory\` ADD CONSTRAINT \`FK_97f878cd06d967443ccf65c4e24\` FOREIGN KEY (\`product_id\`) REFERENCES \`tb_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_inventory\` DROP FOREIGN KEY \`FK_97f878cd06d967443ccf65c4e24\``);
    }

}
