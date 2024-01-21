import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";

@injectable()
class DeleteFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute(id: string): Promise<void> {

        const funcionarioIsAdmin = await this.funcionarioRepository.findFuncionarioIsAdmin(id);

        if (funcionarioIsAdmin)
            throw new AppError("Funcionario é admin e não pode ser excluido pelo sistema!")

        await this.funcionarioRepository.delete(id);
    }
}

export { DeleteFuncionarioUseCase }