import { Request, Response } from 'express'
import { container } from 'tsyringe';

import { UpdateFuncionarioAvatarUseCase } from './UpdateFuncionarioAvatarUseCase';

class UpdateFuncionarioAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.funcionario;
        const avatar_file = request.file.filename;

        const updateFuncionarioAvatarUseCase = container.resolve(UpdateFuncionarioAvatarUseCase)

        await updateFuncionarioAvatarUseCase.execute({ funcionario_id: id, avatar_file });

        return response.status(204).send();
    }

}

export { UpdateFuncionarioAvatarController };