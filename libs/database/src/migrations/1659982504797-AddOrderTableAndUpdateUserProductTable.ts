import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderTableAndUpdateUserProductTable1659982504797
  implements MigrationInterface
{
  name = 'AddOrderTableAndUpdateUserProductTable1659982504797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tb_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total\` int NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'CREATED', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` ADD \`ordersId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` ADD CONSTRAINT \`FK_3ce0320713cd5ed8e15127aac80\` FOREIGN KEY (\`ordersId\`) REFERENCES \`tb_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` DROP FOREIGN KEY \`FK_3ce0320713cd5ed8e15127aac80\``,
    );
    await queryRunner.query(`ALTER TABLE \`tb_user\` DROP COLUMN \`ordersId\``);
    await queryRunner.query(`DROP TABLE \`tb_order\``);
  }
}
