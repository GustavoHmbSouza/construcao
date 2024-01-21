import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IFuncionarioRepository } from "../../../repositories/IFuncionarioRepository";
import { IFuncionariosTokensRepository } from "../../../repositories/IFuncionariosTokensRepository";

interface IRequest {
    email: string;
    senha: string;
}

interface IResponse {
    funcionario: {
        nome: string;
        email: string
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateFuncionarioUseCase {
    constructor(
        @inject("FuncionariosRepository")
        private funcionarioRepository: IFuncionarioRepository,

        @inject("FuncionariosTokensRepository")
        private funcionariosTokensRepository: IFuncionariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, senha }: IRequest): Promise<IResponse> {
        const funcionario = await this.funcionarioRepository.findByEmail(email);
        const { expires_in_token, secret_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

        if (!funcionario) {
            throw new AppError("Email ou senha incorretos");
        }

        const senhaMatch = await compare(senha, funcionario.senha);

        if (!senhaMatch) {
            throw new AppError("Email ou senha incorretos");
        }

        const token = sign({}, secret_token, {
            subject: funcionario.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: funcionario.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_days = this.dateProvider.addDays(expires_refresh_token_days);

        await this.funcionariosTokensRepository.create({
            funcionario_id: funcionario.id,
            data_expiracao: refresh_token_expires_days,
            refresh_token
        })

        return {
            funcionario: {
                nome: funcionario.nome,
                email: funcionario.email
            },
            token,
            refresh_token
        }
    }
}

export { AuthenticateFuncionarioUseCase }