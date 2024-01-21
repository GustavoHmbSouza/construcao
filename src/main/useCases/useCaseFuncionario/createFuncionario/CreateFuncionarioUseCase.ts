import { inject, injectable } from "tsyringe";
import { ICreateFuncionarioDTO } from "../../../dtos/ICreateFuncionarioDTO";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";
import { hash } from 'bcryptjs'
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute({ nome, email, funcao, senha }: ICreateFuncionarioDTO): Promise<void> {
        const funcionarioAlreadyExists = await this.funcionarioRepository.findByEmail(email);

        if (funcionarioAlreadyExists)
            throw new AppError("Funcionario já existe com este e-mail!")

        const hashsenha = await hash(senha, 8);

        await this.funcionarioRepository.create({ nome, email, funcao, senha: hashsenha })
    }
}

export { CreateFuncionarioUseCase }