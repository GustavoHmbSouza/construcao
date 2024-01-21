import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { FuncionariosTokensRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosTokensRepositoryEmMemoria";
import { ICreateFuncionarioDTO } from "../../../dtos/ICreateFuncionarioDTO";
import { AuthenticateFuncionarioUseCase } from "./AuthenticateFuncionarioUseCase";
import { CreateFuncionarioUseCase } from "../createFuncionario/CreateFuncionarioUseCase";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementacoes/DayjsDateProvider";


let funcionariosRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let funcionariosTokensRepositoryEmMemoria: FuncionariosTokensRepositoryEmMemoria;
let authenticateFuncionarioUseCase: AuthenticateFuncionarioUseCase;
let createFuncionarioUseCase: CreateFuncionarioUseCase;
let dateProvider: DayjsDateProvider;

describe("Autenticacao do Funcionario", () => {
    beforeEach(() => {
        funcionariosRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        funcionariosTokensRepositoryEmMemoria = new FuncionariosTokensRepositoryEmMemoria();
        dateProvider = new DayjsDateProvider();
        authenticateFuncionarioUseCase = new AuthenticateFuncionarioUseCase(funcionariosRepositoryEmMemoria, funcionariosTokensRepositoryEmMemoria, dateProvider);
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionariosRepositoryEmMemoria);
    })

    it("Deve ser possível autenticar um usuário", async () => {
        const funcionario: ICreateFuncionarioDTO = {
            email: "funcionario@teste.com",
            senha: "1234",
            nome: "teste",
            funcao: "recepcionista"
        };

        await createFuncionarioUseCase.execute(funcionario);

        const result = await authenticateFuncionarioUseCase.execute({
            email: funcionario.email,
            senha: funcionario.senha
        })

        expect(result).toHaveProperty("token");
    })

    it("Não deve ser possivel autenticar um funcionario por ele não existir", () => {
        expect(async () => {
            await authenticateFuncionarioUseCase.execute({
                email: "false@email.com",
                senha: "1234"
            })
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Não deve ser possivel autenticar um funcionario por ele não existir", () => {
        expect(async () => {
            const funcionario: ICreateFuncionarioDTO = {
                email: "funcionario@teste.com",
                senha: "1234",
                nome: "teste",
                funcao: "recepcionista"
            };

            await createFuncionarioUseCase.execute(funcionario);

            const result = await authenticateFuncionarioUseCase.execute({
                email: funcionario.email,
                senha: "4321"
            })

            expect(result).toHaveProperty("token");
        }).rejects.toBeInstanceOf(AppError);
    })
})