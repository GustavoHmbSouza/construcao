import { container } from "tsyringe";
import "../container/providers";
import { IFuncionarioRepository } from "../../main/repositories/IFuncionarioRepository";
import { FuncionariosTokensRepository } from "../../main/infra/typeorm/repositories/FuncionariosTokensRepository";
import { IFuncionariosTokensRepository } from "../../main/repositories/IFuncionariosTokensRepository";
import { FuncionariosRepository } from "../../main/infra/typeorm/repositories/FuncionariosRepository";

container.registerSingleton<IFuncionarioRepository>(
    "FuncionariosRepository",
    FuncionariosRepository
);

container.registerSingleton<IFuncionariosTokensRepository>(
    "FuncionariosTokensRepository",
    FuncionariosTokensRepository
);