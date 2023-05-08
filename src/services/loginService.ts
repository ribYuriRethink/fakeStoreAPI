import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Repositories from "../repository/Repositories";
import { makeError } from "../middleware/errorHandler";

const verifyLogin = async (username: string, password: string) => {
  const user = await Repositories.getUser(username);

  if (!user[0])
    throw makeError({ message: "Usuário não existe!", status: 400 });

  const validUser = await bcrypt.compare(password, user[0].password);

  if (!validUser) throw makeError({ message: "Senha inválida!", status: 400 });

  return generateToken(user[0].id, username);
};

const generateToken = (userId: number, username: string) => {
  const token = jwt.sign(
    {
      userId,
      username,
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "1h" }
  );

  return token;
};

export default { verifyLogin };
