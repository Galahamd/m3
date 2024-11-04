import { Router } from "express";
import { getAllUsersController, getUserByIdController, postUserLoginController, postUserRegisterController } from "../controllers/usersControllers";

const usersRouter = Router();

usersRouter.get("/", getAllUsersController);
usersRouter.get("/:id", getUserByIdController);
usersRouter.post("/register",postUserRegisterController);
usersRouter.post("/login",postUserLoginController);

export default usersRouter;