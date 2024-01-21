import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { CreateFuncionarioUseCase } from "../createFuncionario/CreateFuncionarioUseCase";
import { GetFuncionarioUseCase } from "./GetFuncionarioUseCase";

let funcionarioRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let createFuncionarioUseCase: CreateFuncionarioUseCase;
let getFuncionarioUseCase: GetFuncionarioUseCase;

describe("Criar funcionario", () => {
    beforeEach(() => {
        funcionarioRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
        getFuncionarioUseCase = new GetFuncionarioUseCase(funcionarioRepositoryEmMemoria);
    });

    it("Deve consultar um funcionario", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };

        await createFuncionarioUseCase.execute(funcionario);
        const funcionarioExiste = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);

        const funcionarioGet = await getFuncionarioUseCase.execute(funcionarioExiste.id);

        expect(funcionarioGet).toHaveProperty("id");
    });
})