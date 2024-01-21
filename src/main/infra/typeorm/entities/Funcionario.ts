import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity("funcionarios")
class Funcionario {

    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    funcao: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    is_bloqueado: boolean;

    @Column()
    is_admin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id)
            this.id = uuidV4();
    }
}

export { Funcionario }