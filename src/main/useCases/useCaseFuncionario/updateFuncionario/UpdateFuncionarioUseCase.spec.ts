import { AppError } from "../../../../shared/errors/AppError";
import { FuncionariosRepositoryEmMemoria } from "../../../repositories/emMemoria/FuncionariosRepositoryEmMemoria";
import { CreateFuncionarioUseCase } from "../createFuncionario/CreateFuncionarioUseCase";
import { UpdateFuncionarioUseCase } from "./UpdateFuncionarioUseCase";

let funcionarioRepositoryEmMemoria: FuncionariosRepositoryEmMemoria;
let createFuncionarioUseCase: CreateFuncionarioUseCase;
let updateFuncionarioUseCase: UpdateFuncionarioUseCase;

describe("Editar funcionario", () => {
    beforeEach(() => {
        funcionarioRepositoryEmMemoria = new FuncionariosRepositoryEmMemoria();
        createFuncionarioUseCase = new CreateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
        updateFuncionarioUseCase = new UpdateFuncionarioUseCase(funcionarioRepositoryEmMemoria);
    });

    it("Deve editar um funcionario", async () => {
        const funcionario = {
            nome: "Categoria Teste",
            funcao: "Descricao da categoria de teste",
            email: "teste@teste.com",
            senha: "321"
        };


        await createFuncionarioUseCase.execute(funcionario);

        let funcionarioCriado = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);
        const id = funcionarioCriado.id;
        const novoNome = "Novo nome";

        await updateFuncionarioUseCase.execute({ id, nome: novoNome, funcao: undefined, email: undefined });

        const funcionarioEditado = await funcionarioRepositoryEmMemoria.findByEmail(funcionario.email);

        expect(funcionarioEditado.nome).toEqual(novoNome);
        expect(funcionarioEditado.email).toEqual(funcionario.email);
    });
})