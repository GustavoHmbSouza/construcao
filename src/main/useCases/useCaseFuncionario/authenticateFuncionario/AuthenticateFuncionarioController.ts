import { container } from "tsyringe";
import { AuthenticateFuncionarioUseCase } from "./AuthenticateFuncionarioUseCase";
import { Request, Response } from 'express';

class AuthenticateFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.body;

        const authenticateFuncionarioUseCase = container.resolve(AuthenticateFuncionarioUseCase);

        const token = await authenticateFuncionarioUseCase.execute({ email, senha })

        return response.json(token);
    }
}

export { AuthenticateFuncionarioController }