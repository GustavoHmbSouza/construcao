import { getRepository, Repository } from "typeorm";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";
import { ICreateFuncionarioDTO } from "../../../dtos/ICreateFuncionarioDTO";
import { Funcionario } from "../entities/Funcionario";
import { IUpdateFuncionarioDTO } from "../../../dtos/IUpdateFuncionarioDTO";

class FuncionariosRepository implements IFuncionarioRepository {
    private repository: Repository<Funcionario>;

    constructor() {
        this.repository = getRepository(Funcionario);
    }


    async create({ nome, email, funcao, senha, avatar, id }: ICreateFuncionarioDTO): Promise<void> {
        const funcionario = this.repository.create({ nome, email, funcao, senha, avatar, id });

        await this.repository.save(funcionario);
    }

    async findByEmail(email: string): Promise<Funcionario> {
        const funcionario = await this.repository.findOne({ email })

        return funcionario;
    }

    async findById(id: string): Promise<Funcionario> {
        const funcionario = await this.repository.findOne(id)

        return funcionario;
    }

    async findAll(): Promise<Funcionario[]> {
        const funcionario = await this.repository.find();

        return funcionario;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findFuncionarioIsAdmin(id: string): Promise<Funcionario> {
        const funcionario = await this.repository.findOne({ where: { id, is_admin: true } })

        return funcionario;
    }

    async update({ id, nome, email, funcao }: IUpdateFuncionarioDTO): Promise<void> {
        const funcionario = this.repository.create({ id, nome, email, funcao });

        await this.repository.save(funcionario);
    }
}

export { FuncionariosRepository }