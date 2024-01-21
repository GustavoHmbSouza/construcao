import { NextFunction, Response, Request } from "express";
import { FuncionariosRepository } from "../../../../main/infra/typeorm/repositories/FuncionariosRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.funcionario;

    const funcionariosRepository = new FuncionariosRepository();
    const funcionario = await funcionariosRepository.findById(id);

    if (!funcionario.is_admin) {
        throw new AppError("Funcionario não é admin!")
    }

    return next();
}