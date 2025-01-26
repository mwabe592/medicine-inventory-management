import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/register", authControllers.registerUserController);
authRouter.post("/login", authControllers.loginUserController);

export default authRouter;
