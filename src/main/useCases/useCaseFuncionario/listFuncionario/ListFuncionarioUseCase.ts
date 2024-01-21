import { inject, injectable } from "tsyringe";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";
import { Funcionario } from "../../../infra/typeorm/entities/Funcionario";

@injectable()
class ListFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute(): Promise<Funcionario[]> {

        const funcionarios = await this.funcionarioRepository.findAll();

        return funcionarios;
    }
}

export { ListFuncionarioUseCase }