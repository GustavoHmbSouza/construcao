import { container } from "tsyringe";
import { UpdateFuncionarioUseCase } from "./UpdateFuncionarioUseCase"
import { Request, Response } from 'express'


class UpdateFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, nome, email, funcao } = request.body;
        const updateFuncionarioUseCase = container.resolve(UpdateFuncionarioUseCase);

        await updateFuncionarioUseCase.execute({ id, nome, email, funcao });

        return response.status(201).send();
    }
}

export { UpdateFuncionarioController }