import { inject, injectable } from "tsyringe";
import { Funcionario } from "../../../infra/typeorm/entities/Funcionario";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";

@injectable()
class GetFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute(id: string): Promise<Funcionario> {
        const funcionario = await this.funcionarioRepository.findById(id);

        return funcionario;
    }
}

export { GetFuncionarioUseCase }