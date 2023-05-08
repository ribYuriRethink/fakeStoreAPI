import { Request, Response, NextFunction } from "express";
import { makeError } from "./errorHandler";
import jwt from "jsonwebtoken";
import Repositories from "../repository/Repositories";

export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      throw makeError({
        message: "Token de autenticação obrigatório!",
        status: 500,
      });

    const userToken = token.split(" ")[1]!;
    const tokenVerify: any = jwt.verify(userToken, process.env.SECRET_TOKEN!);
    const userFromDatabase = await Repositories.getUser(tokenVerify.username);
    if (!userFromDatabase[0])
      throw makeError({
        message: "Usuário não esta logado ou não existe!",
        status: 500,
      });
    next();
  } catch (error: any) {
    if (error.message === "jwt expired")
      next(
        makeError({
          message: "O token expirou! Logue novamente!",
          status: 500,
        })
      );
    next(error);
  }
};
