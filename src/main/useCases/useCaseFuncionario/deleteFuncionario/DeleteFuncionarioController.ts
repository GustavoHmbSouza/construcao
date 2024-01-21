import { container } from "tsyringe";
import { DeleteFuncionarioUseCase } from "./DeleteFuncionarioUseCase"
import { Request, Response } from 'express'


class DeleteFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteFuncionarioUseCase = container.resolve(DeleteFuncionarioUseCase);

        await deleteFuncionarioUseCase.execute(id);

        return response.status(201).send();
    }
}

export { DeleteFuncionarioController }