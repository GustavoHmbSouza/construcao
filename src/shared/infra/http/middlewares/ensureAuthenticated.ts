import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { FuncionariosRepository } from '../../../../main/infra/typeorm/repositories/FuncionariosRepository';
import { FuncionariosTokensRepository } from '../../../../main/infra/typeorm/repositories/FuncionariosTokensRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new AppError("Token não existe", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        request.funcionario = { id: user_id };

        next();
    } catch {
        throw new AppError("Token invalido", 401);
    }

}