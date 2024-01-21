import { container } from "tsyringe";
import { ListFuncionarioUseCase } from "./ListFuncionarioUseCase"
import { Request, Response } from 'express'


class ListFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listFuncionarioUseCase = container.resolve(ListFuncionarioUseCase);

        const funcionarios = await listFuncionarioUseCase.execute();

        return response.send(funcionarios);
    }
}

export { ListFuncionarioController }