import Repositories from "../repository/Repositories";
import bcrypt from "bcrypt";

const register = async (username: string, password: string) => {
  const cryptedPassword = await bcrypt.hash(password, 10);
  const inserted: number[] = await Repositories.createNewUser(
    username,
    cryptedPassword
  );

  return inserted[0];
};

export default { register };
