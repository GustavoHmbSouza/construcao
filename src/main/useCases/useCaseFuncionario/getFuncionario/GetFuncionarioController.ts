import { container } from "tsyringe";
import { GetFuncionarioUseCase } from "./GetFuncionarioUseCase"
import { Request, Response } from 'express'


class GetFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const getFuncionarioUseCase = container.resolve(GetFuncionarioUseCase);

        const funcionario = await getFuncionarioUseCase.execute(id);

        return response.send(funcionario);
    }
}

export { GetFuncionarioController }