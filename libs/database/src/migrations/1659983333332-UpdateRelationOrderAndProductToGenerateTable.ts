import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationOrderAndProductToGenerateTable1659983333332
  implements MigrationInterface
{
  name = 'UpdateRelationOrderAndProductToGenerateTable1659983333332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tb_order_product\` (\`order_id\` int NOT NULL, \`product_id\` int NOT NULL, INDEX \`IDX_4f8e9425119c6dc6a7ad0e393d\` (\`order_id\`), INDEX \`IDX_c2841f72b364a5fa61dfd32f04\` (\`product_id\`), PRIMARY KEY (\`order_id\`, \`product_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_order_product\` ADD CONSTRAINT \`FK_4f8e9425119c6dc6a7ad0e393d9\` FOREIGN KEY (\`order_id\`) REFERENCES \`tb_order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_order_product\` ADD CONSTRAINT \`FK_c2841f72b364a5fa61dfd32f04a\` FOREIGN KEY (\`product_id\`) REFERENCES \`tb_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tb_order_product\` DROP FOREIGN KEY \`FK_c2841f72b364a5fa61dfd32f04a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_order_product\` DROP FOREIGN KEY \`FK_4f8e9425119c6dc6a7ad0e393d9\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c2841f72b364a5fa61dfd32f04\` ON \`tb_order_product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4f8e9425119c6dc6a7ad0e393d\` ON \`tb_order_product\``,
    );
    await queryRunner.query(`DROP TABLE \`tb_order_product\``);
  }
}
