import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { funcionariosRoutes } from "./funcionarios.rotas";

const router = Router();

router.use(authenticateRoutes);
router.use("/funcionarios", funcionariosRoutes);

export { router };
