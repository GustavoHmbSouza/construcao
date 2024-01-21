import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { CreateFuncionarioUseCase } from "./CreateFuncionarioUseCase";

let funcionarioRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let createFuncionarioUseCase: CreateFuncionarioUseCase;

describe("Criar funcionario", () => {
    beforeEach(() => {
        funcionarioRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
    });

    it("Deve criar um novo funcionario", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };

        await createFuncionarioUseCase.execute(funcionario);

        const funcionarioExiste = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);

        expect(funcionarioExiste).toHaveProperty("id");
    });

    it("Não deve criar um novo funcionario por já existir um com o mesmo e-mail", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };

        await createFuncionarioUseCase.execute(funcionario);

        await expect(
            createFuncionarioUseCase.execute(funcionario)
        ).rejects.toEqual(new AppError("Funcionario já existe com este e-mail!"));
    });
})