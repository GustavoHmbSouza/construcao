import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { CreateFuncionarioUseCase } from "../createFuncionario/CreateFuncionarioUseCase";
import { DeleteFuncionarioUseCase } from "./DeleteFuncionarioUseCase";

let funcionarioRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let createFuncionarioUseCase: CreateFuncionarioUseCase;
let deleteFuncionarioUseCase: DeleteFuncionarioUseCase;

describe("Criar funcionario", () => {
    beforeEach(() => {
        funcionarioRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
        deleteFuncionarioUseCase = new DeleteFuncionarioUseCase(funcionarioRepositoryEmMemoria);
    });

    it("Deve deletar um funcionario", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };

        await createFuncionarioUseCase.execute(funcionario);
        const funcionarioExiste = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);
        expect(funcionarioExiste).toHaveProperty("id");

        await deleteFuncionarioUseCase.execute(funcionarioExiste.id);
        const funcionarioDeletadoExiste = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);
        expect(funcionarioDeletadoExiste).toEqual(undefined);
    });
})