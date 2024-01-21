import { inject, injectable } from "tsyringe";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";
import { IUpdateFuncionarioDTO } from "../../../dtos/IUpdateFuncionarioDTO";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class UpdateFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute({ id, nome, email, funcao }: IUpdateFuncionarioDTO): Promise<void> {
        const funcionarioIsAdmin = await this.funcionarioRepository.findFuncionarioIsAdmin(id);

        if (funcionarioIsAdmin)
            throw new AppError("Funcionario é admin e não pode ser editado pelo sistema!")

        await this.funcionarioRepository.update({ id, nome, email, funcao })
    }
}

export { UpdateFuncionarioUseCase }