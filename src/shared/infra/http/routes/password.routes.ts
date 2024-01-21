/*
import { Router } from "express";
import { EnviarEmailSenhaPerdidaController } from "../../../../main/useCases/UseCaseEmail/EnviarEmailSenhaPerdida/EnviarEmailSenhaPerdidaController";
import { ResetPasswordFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/resetPasswordFuncionario/ResetPasswordFuncionarioController";



const passwordRoutes = Router();

const enviarEmailSenhaPerdidaController = new EnviarEmailSenhaPerdidaController();
const resetPasswordFuncionarioController = new ResetPasswordFuncionarioController();

passwordRoutes.post("/forgot", enviarEmailSenhaPerdidaController.handle);
passwordRoutes.post("/reset", resetPasswordFuncionarioController.handle);

export { passwordRoutes };

*/