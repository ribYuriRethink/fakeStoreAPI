import { Router } from "express";
import middleware from "../middleware/dataValidator";
import userController from "../controller/userController";
import loginController from "../controller/loginController";

const user = Router();
const login = Router();

user.post("/", userController.insert);
login.post("/", loginController.validateLogin);

export { user, login };
