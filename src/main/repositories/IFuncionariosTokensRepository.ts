import { ICreateFuncionariosTokensDTO } from "../dtos/ICreateFuncionariosTokensDTO";
import { FuncionariosTokens } from "../infra/typeorm/entities/FuncionariosTokens";


interface IFuncionariosTokensRepository {
    create({ funcionario_id, data_expiracao, refresh_token }: ICreateFuncionariosTokensDTO): Promise<FuncionariosTokens>;

    findByFuncionarioAndRefreshToken(funcionario_id: string, refresh_token: string): Promise<FuncionariosTokens>

    deleteById(id: string): Promise<void>

    findByRefreshToken(refresh_token: string): Promise<FuncionariosTokens>
}

export { IFuncionariosTokensRepository }