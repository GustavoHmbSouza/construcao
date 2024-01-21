import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'
import { Funcionario } from './Funcionario';

@Entity("funcionarios_tokens")
class FuncionariosTokens {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    funcionario_id: string;

    @ManyToOne(() => Funcionario)
    @JoinColumn({ name: "funcionario_id" })
    funcionario: Funcionario;

    @Column()
    data_expiracao: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { FuncionariosTokens }