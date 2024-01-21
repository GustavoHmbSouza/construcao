import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

export class CreateFuncionariosToken1669314475268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "funcionarios_tokens",
                columns: [{
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "refresh_token",
                    type: "varchar"
                },
                {
                    name: "funcionario_id",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "data_expiracao",
                    type: "timestamp"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
                ],
                foreignKeys: [
                    {
                        name: "FKFuncionarioToken",
                        referencedTableName: "funcionarios",
                        referencedColumnNames: ["id"],
                        columnNames: ["funcionario_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("funcionarios_tokens")
    }

}
