import { container } from "tsyringe";
import { CreateFuncionarioUseCase } from "./CreateFuncionarioUseCase"
import { Request, Response } from 'express'


class CreateFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, email, senha, funcao } = request.body;
        const createFuncionarioUseCase = container.resolve(CreateFuncionarioUseCase);

        await createFuncionarioUseCase.execute({ nome, email, senha, funcao });

        return response.status(201).send();
    }
}

export { CreateFuncionarioController }