import { Request, Response, NextFunction } from "express";
import loginService from "../services/loginService";

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const token: string = await loginService.verifyLogin(username, password);
    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

export default { validateLogin };
