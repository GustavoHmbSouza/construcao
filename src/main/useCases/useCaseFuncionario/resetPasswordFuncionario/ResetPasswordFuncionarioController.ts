import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordFuncionarioUseCase } from "./ResetPasswordFuncionarioUseCase";

class ResetPasswordFuncionarioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUseCase = container.resolve(
            ResetPasswordFuncionarioUseCase
        );

        resetPasswordUseCase.execute({ token: String(token), password });

        return response.send();
    }
}

export { ResetPasswordFuncionarioController };
