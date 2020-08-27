import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldAndAddTimestampAppointment1598486449415
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({ name: "provider_id", type: "uuid", isNullable: true })
    );
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      })
    );

    await queryRunner.createForeignKey("appointments", new TableForeignKey({
        name: 'AppointmentProvider',
        //A coluna que vai receber a chave estrangeira;
        columnNames: ['provider_id'],
        //Qual o nome da coluna na tabela de usuário que vai representar o usuário id - id;
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        //O que vai acontecer os agendamentos, caso esse usuário seja deletado - mantém
        onDelete: 'SET NULL',
        //Refletir se o usuário mudou o seu id, nas referêncisa;
        onUpdate: 'CASCADE',
    }))
  }

  //Desfazer as ações acima, em ordem reversa!
  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn('appointments', new TableColumn({
        name: "name",
        type: "varchar",
      }));

      await queryRunner.dropColumn("appointments", "created_at");
      
      await queryRunner.dropColumn("appointments", "updated_at");
  }
}
