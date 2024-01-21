import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosTokensRepository } from "../../../infra/typeorm/repositories/FuncionariosTokensRepository";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("FuncionariosTokensRepository")
        private funcionariosTokensRepository: FuncionariosTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

        const funcionario_id = sub;

        const funcionario_token = await this.funcionariosTokensRepository.findByFuncionarioAndRefreshToken(funcionario_id, token);

        if (!funcionario_token)
            throw new AppError("Refresh token não existe!")

        await this.funcionariosTokensRepository.deleteById(funcionario_token.id);

        const refresh_token_expires_days = this.dateProvider.addDays(auth.expires_refresh_token_days);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        await this.funcionariosTokensRepository.create({
            data_expiracao: refresh_token_expires_days,
            refresh_token,
            funcionario_id
        })

        const newToken = sign({}, auth.secret_token, {
            subject: funcionario_id,
            expiresIn: auth.expires_in_token
        });

        return { token: newToken, refresh_token };
    }
}

export { RefreshTokenUseCase }  
