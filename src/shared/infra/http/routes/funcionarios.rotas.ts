import { Router } from "express";

import uploadConfig from '../../../../config/upload';
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/createFuncionario/CreateFuncionarioController";
import { UpdateFuncionarioAvatarController } from "../../../../main/useCases/useCaseFuncionario/updateFuncionarioAvatar/UpdateFuncionarioAvatarController";
import { ListFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/listFuncionario/ListFuncionarioController";
import { DeleteFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/deleteFuncionario/DeleteFuncionarioController";
import { GetFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/getFuncionario/GetFuncionarioController";
import { UpdateFuncionarioController } from "../../../../main/useCases/useCaseFuncionario/updateFuncionario/UpdateFuncionarioController";

const funcionariosRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("avatar"));

const createFuncionarioController = new CreateFuncionarioController();
const updateFuncionarioAvatarController = new UpdateFuncionarioAvatarController();
const listFuncionarioController = new ListFuncionarioController();
const deleteFuncionarioController = new DeleteFuncionarioController();
const getFuncionarioController = new GetFuncionarioController();
const updateFuncionarioController = new UpdateFuncionarioController();

funcionariosRoutes.post("/", createFuncionarioController.handle);
funcionariosRoutes.get("/", listFuncionarioController.handle);
funcionariosRoutes.delete("/:id", deleteFuncionarioController.handle);
funcionariosRoutes.get("/:id", getFuncionarioController.handle);
funcionariosRoutes.put("/", updateFuncionarioController.handle);

funcionariosRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateFuncionarioAvatarController.handle);

export { funcionariosRoutes };
