import { Router } from "express";
import { AuthenticateFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/authenticateFuncionario/AuthenticateFuncionarioController";
import { RefreshTokenController } from "../../../../main/useCases/useCaseFuncionario/refreshToken/RefreshTokenController";


const authenticateRoutes = Router();

const authenticateFuncionarioController = new AuthenticateFuncionarioController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateFuncionarioController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
