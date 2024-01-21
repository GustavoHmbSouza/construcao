import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosTokensRepository } from "../../../infra/typeorm/repositories/FuncionariosTokensRepository";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";

interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordFuncionarioUseCase {
    constructor(
        @inject("FuncionariosTokensRepository")
        private funcionariosTokensRepository: FuncionariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {
        const funcionario_token =
            await this.funcionariosTokensRepository.findByRefreshToken(token);

        if (!funcionario_token) throw new AppError("Token invalido");

        if (
            this.dateProvider.compareIfBefore(
                funcionario_token.data_expiracao,
                this.dateProvider.dateNow()
            )
        )
            throw new AppError("Token expirado!");

        const funcionario = await this.funcionarioRepository.findById(
            funcionario_token.funcionario_id
        );

        funcionario.senha = await hash(password, 8);

        await this.funcionarioRepository.create(funcionario);

        await this.funcionariosTokensRepository.deleteById(funcionario_token.id);
    }
}

export { ResetPasswordFuncionarioUseCase };
