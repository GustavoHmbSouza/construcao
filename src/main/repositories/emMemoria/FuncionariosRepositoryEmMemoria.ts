import { ICreateFuncionarioDTO } from "../../dtos/ICreateFuncionarioDTO";
import { IUpdateFuncionarioDTO } from "../../dtos/IUpdateFuncionarioDTO";
import { Funcionario } from "../../infra/typeorm/entities/Funcionario";
import { IFuncionarioRepository } from "../IFuncionarioRepository";

class FuncionariosRepositoryEmMemoria implements IFuncionarioRepository {
    funcionarios: Funcionario[] = [];

    async create({ email, nome, funcao, senha }: ICreateFuncionarioDTO): Promise<void> {
        const funcionario = new Funcionario();

        Object.assign(funcionario, { email, nome, funcao, senha });

        this.funcionarios.push(funcionario);

    }

    async findByEmail(email: string): Promise<Funcionario> {
        return this.funcionarios.find((funcionario) => funcionario.email == email)
    }

    async findById(id: string): Promise<Funcionario> {
        return this.funcionarios.find((funcionario) => funcionario.id == id)
    }

    async findAll(): Promise<Funcionario[]> {
        const funcionarios = this.funcionarios;
        return funcionarios;
    }

    async delete(id: string): Promise<void> {
        const funcionarioDelete = this.funcionarios.find((ut) => ut.id === id);
        this.funcionarios.splice(this.funcionarios.indexOf(funcionarioDelete))
    }

    async findFuncionarioIsAdmin(id: string): Promise<Funcionario> {
        return this.funcionarios.find((funcionario) => funcionario.is_admin);
    }

    async update(funcionarioUpdate: IUpdateFuncionarioDTO): Promise<void> {
        const findIndex = this.funcionarios.findIndex(funcionario => funcionario.id === funcionarioUpdate.id);
        const funcionario = this.funcionarios.find((funcionario) => funcionario.id === funcionarioUpdate.id);

        Object.keys(funcionarioUpdate).forEach(key => funcionarioUpdate[key] === undefined ? delete funcionarioUpdate[key] : {});

        Object.assign(funcionario, funcionarioUpdate);

        this.funcionarios[findIndex] = funcionario;
    }
}

export { FuncionariosRepositoryEmMemoria };