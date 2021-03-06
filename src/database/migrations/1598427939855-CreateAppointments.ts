import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1598427939855 implements MigrationInterface {
  //!!SÓ PODE ALTERAR UMA MIGRATION SE ELA NÃO FOI AINDA ENVIADA PARA UM CONTROLE DE VERSÃO;
  // Se não, tem que criar uma nova com as alterações;
  //O que quer que seja feito no BD, quando a mesma for executada;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ]
      })
    );
  }

  //Fallback - Desfazer o método up;
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
