import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationOrderAndUser1659982706299
  implements MigrationInterface
{
  name = 'UpdateRelationOrderAndUser1659982706299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` DROP FOREIGN KEY \`FK_3ce0320713cd5ed8e15127aac80\``,
    );
    await queryRunner.query(`ALTER TABLE \`tb_user\` DROP COLUMN \`ordersId\``);
    await queryRunner.query(
      `ALTER TABLE \`tb_order\` ADD \`user_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_order\` ADD CONSTRAINT \`FK_e4de603b6d07e629e3275a2a268\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tb_order\` DROP FOREIGN KEY \`FK_e4de603b6d07e629e3275a2a268\``,
    );
    await queryRunner.query(`ALTER TABLE \`tb_order\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` ADD \`ordersId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tb_user\` ADD CONSTRAINT \`FK_3ce0320713cd5ed8e15127aac80\` FOREIGN KEY (\`ordersId\`) REFERENCES \`tb_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
