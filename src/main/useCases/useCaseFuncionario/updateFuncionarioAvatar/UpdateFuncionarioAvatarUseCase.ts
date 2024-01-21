import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { FuncionariosRepository } from "../../../infra/typeorm/repositories/FuncionariosRepository";


interface IRequest {
    funcionario_id: string;
    avatar_file: string;
}

@injectable()
class UpdateFuncionarioAvatarUseCase {

    constructor(
        @inject("FuncionariosRepository")
        private funcionariosRepository: FuncionariosRepository
    ) { }

    async execute({ funcionario_id, avatar_file }: IRequest): Promise<void> {
        const funcionario = await this.funcionariosRepository.findById(funcionario_id);

        if (funcionario.avatar)
            await deleteFile("avatar", funcionario.avatar);

        funcionario.avatar = avatar_file;

        await this.funcionariosRepository.create(funcionario)
    }
}

export { UpdateFuncionarioAvatarUseCase };