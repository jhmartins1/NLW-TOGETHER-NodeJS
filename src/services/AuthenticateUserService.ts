import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se o email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect")
    }
    // Verificar se a senha ta correta
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }
    // Gerar Token
    const token = sign({
      email: user.email
    }, "da4bd03ddffa7ec45defb2758681a3d9", {
      subject: user.id,
      expiresIn: "1d"
    });
    return token;
  }
}

export { AuthenticateUserService }