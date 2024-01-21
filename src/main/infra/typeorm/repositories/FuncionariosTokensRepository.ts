import { getRepository, Repository } from "typeorm";
import { ICreateFuncionariosTokensDTO } from "../../../dtos/ICreateFuncionariosTokensDTO";
import { IFuncionariosTokensRepository } from "../../../repositories/IFuncionariosTokensRepository";
import { FuncionariosTokens } from "../entities/FuncionariosTokens";


class FuncionariosTokensRepository implements IFuncionariosTokensRepository {
    private repository: Repository<FuncionariosTokens>

    constructor() {
        this.repository = getRepository(FuncionariosTokens);
    }

    async create({ funcionario_id, data_expiracao, refresh_token }: ICreateFuncionariosTokensDTO): Promise<FuncionariosTokens> {
        const funcionarioToken = this.repository.create({ funcionario_id, data_expiracao, refresh_token });

        await this.repository.save(funcionarioToken);

        return funcionarioToken;
    }

    async findByFuncionarioAndRefreshToken(funcionario_id: string, refresh_token: string): Promise<FuncionariosTokens> {
        const funcionariosTokens = await this.repository.findOne({ funcionario_id, refresh_token })

        return funcionariosTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<FuncionariosTokens> {
        const funcionariosTokens = await this.repository.findOne({ refresh_token })

        return funcionariosTokens;
    }
}

export { FuncionariosTokensRepository }