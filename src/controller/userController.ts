import { NextFunction, Request, Response } from "express";
import authenticationService from "../services/userService";
import { number } from "yup";

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const userId: number = await authenticationService.register(
      username,
      password
    );
    res.status(200).send({ id: userId, username });
  } catch (error) {
    next(error);
  }
};

export default { insert };
