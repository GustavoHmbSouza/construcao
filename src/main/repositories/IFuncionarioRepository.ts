import { ICreateFuncionarioDTO } from "../dtos/ICreateFuncionarioDTO";
import { IUpdateFuncionarioDTO } from "../dtos/IUpdateFuncionarioDTO";
import { Funcionario } from "../infra/typeorm/entities/Funcionario";


interface IFuncionarioRepository {

    create(data: ICreateFuncionarioDTO): Promise<void>;
    findByEmail(email: string): Promise<Funcionario>;
    findById(id: string): Promise<Funcionario>;
    findAll(): Promise<Funcionario[]>;
    delete(id: string): Promise<void>;
    findFuncionarioIsAdmin(id: string): Promise<Funcionario>;
    update(data: IUpdateFuncionarioDTO): Promise<void>;
}

export { IFuncionarioRepository }