import { ICreateFuncionariosTokensDTO } from "../../dtos/ICreateFuncionariosTokensDTO";
import { FuncionariosTokens } from "../../infra/typeorm/entities/FuncionariosTokens";
import { IFuncionariosTokensRepository } from "../IFuncionariosTokensRepository";


class FuncionariosTokensRepositoryEmMemoria implements IFuncionariosTokensRepository {

    funcionariosTokens: FuncionariosTokens[] = [];

    async create({ funcionario_id, data_expiracao, refresh_token }: ICreateFuncionariosTokensDTO): Promise<FuncionariosTokens> {
        const funcionarioToken = new FuncionariosTokens();

        Object.assign(funcionarioToken, { funcionario_id, data_expiracao, refresh_token });

        this.funcionariosTokens.push(funcionarioToken);

        return funcionarioToken;
    }
    async findByFuncionarioAndRefreshToken(funcionario_id: string, refresh_token: string): Promise<FuncionariosTokens> {
        return this.funcionariosTokens.find((ut) => ut.funcionario_id === funcionario_id && ut.refresh_token === refresh_token)
    }
    async deleteById(id: string): Promise<void> {
        const funcionarioToken = this.funcionariosTokens.find((ut) => ut.id === id);
        this.funcionariosTokens.splice(this.funcionariosTokens.indexOf(funcionarioToken))
    }
    async findByRefreshToken(refresh_token: string): Promise<FuncionariosTokens> {
        return this.funcionariosTokens.find((ut) => ut.refresh_token === refresh_token)
    }

}

export { FuncionariosTokensRepositoryEmMemoria }