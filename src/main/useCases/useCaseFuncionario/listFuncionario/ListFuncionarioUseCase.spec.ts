import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { CreateFuncionarioUseCase } from "../createFuncionario/CreateFuncionarioUseCase";
import { ListFuncionarioUseCase } from "./ListFuncionarioUseCase";

let funcionarioRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let createFuncionarioUseCase: CreateFuncionarioUseCase;
let listFuncionarioUseCase: ListFuncionarioUseCase;

describe("Criar funcionario", () => {
    beforeEach(() => {
        funcionarioRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
        listFuncionarioUseCase = new ListFuncionarioUseCase(funcionarioRepositoryEmMemoria);
    });

    it("Deve consultar um funcionario", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };

        const funcionario2 = {
            nome: "Categoria Teste2",
            funcao: "Descricao da categoria de teste2",
            email: "teste@teste.com2",
            senha: "3212"
        };

        const funcionario3 = {
            nome: "Categoria Teste3",
            funcao: "Descricao da categoria de teste3",
            email: "teste@teste.com3",
            senha: "3213"
        };

        await createFuncionarioUseCase.execute(funcionario);
        await createFuncionarioUseCase.execute(funcionario2);
        await createFuncionarioUseCase.execute(funcionario3);

        const funcionariosList = await listFuncionarioUseCase.execute();

        expect(funcionariosList.length).toEqual(3);
    });
})